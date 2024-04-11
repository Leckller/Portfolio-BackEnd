import fs from 'fs/promises';
import path from 'path';
import { ProjetosType } from '../types';

export default class Database {
  private dbPath = path.resolve(__dirname, './projetos.json');
  public async allProjects(): Promise<ProjetosType[]> {
    const data = await fs.readFile(this.dbPath);
    return JSON.parse(JSON.stringify(data));
  }
  public async addProject(newProject: ProjetosType): Promise<string> {
    const { describe, gitHub, tecnologias, title, url } = newProject;
    if (!describe || !gitHub || !tecnologias || !title || !url) return 'Preencha todos os campos'
    try {
      const readDB = await this.allProjects();
      await fs.writeFile(this.dbPath, JSON.stringify([...readDB, newProject]));
      return 'Projeto adicionado';
    } catch (err) {
      return 'Ocorreu um erro inesperado'
    }
  }
}