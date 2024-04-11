import fs from 'fs/promises';
import path from 'path';
import { ProjetosType } from '../types';

type MethodResponse<T> = { data: T, status: number }

export default class Database {
  private dbPath = path.resolve(__dirname, './projetos.json');
  public async allProjects(): Promise<MethodResponse<ProjetosType[]>> {
    const data = await fs.readFile(this.dbPath);
    return { data: JSON.parse(data.toString()), status: 200 };
  }
  public async addProject(newProject: ProjetosType): Promise<MethodResponse<{ message: string }>> {
    const { describe, gitHub, tecnologias, title, url } = newProject;
    if (!describe || !gitHub || !tecnologias || !title || !url) return { data: { message: 'Preencha todos os campos' }, status: 400 }

    const { data } = await this.allProjects();

    if (data.some(e => e.title === title || e.url === url || e.gitHub === gitHub)) {
      return { data: { message: 'Este projeto já está armazenado' }, status: 400 }
    }

    try {
      await fs.writeFile(this.dbPath, JSON.stringify([...data, newProject]));
      return { data: { message: 'Projeto adicionado' }, status: 201 }
    } catch (err) {
      return { data: { message: 'Ocorreu um erro inesperado' }, status: 500 }
    }
  }

  public async deleteProject(titleProject: string): Promise<MethodResponse<{ message: string }>> {
    try {
      const { data } = await this.allProjects();
      const dbRemove = data.findIndex(e => e.title === titleProject);

      if (dbRemove === -1) {
        return { data: { message: 'Projeto não encontrado' }, status: 404 }
      }

      delete data[dbRemove];

      await fs.writeFile(this.dbPath, JSON.stringify([...data]));
      return { data: { message: 'Projeto removido' }, status: 200 }
    } catch (err) {
      return { data: { message: 'Ocorreu um erro inesperado' }, status: 500 }
    }
  }
}