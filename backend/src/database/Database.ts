import path from 'path';
import { ProjetosType } from '../types';
import FileSystemDB from '../utils/FileSystemDB';

type MethodResponse<T> = { data: T, status: number }

export default class Database {

  private db = new FileSystemDB(path.resolve(__dirname, './projetos.json'))

  public async allProjects(): Promise<MethodResponse<ProjetosType[]>> {
    const data = await this.db.readFile() as ProjetosType[];
    const sortedData = data.sort((a, b) => a.title.length - b.title.length);
    return { data: sortedData, status: 200 };
  }
  public async addProject(newProject: ProjetosType): Promise<MethodResponse<ProjetosType[] | { message: string }>> {
    const { describe, gitHub, tecnologias, title, url } = newProject;
    if (!describe || !gitHub || !tecnologias || !title || !url) return { data: { message: 'Preencha todos os campos' }, status: 400 }

    const { data } = await this.allProjects();

    if (data.some(e => e.title === title || e.url === url || e.gitHub === gitHub)) {
      return { data: { message: 'Este projeto já está armazenado' }, status: 400 }
    }

    try {
      const dataWrite = await this.db.writeFile(newProject);
      return { data: dataWrite, status: 201 }
    } catch (err) {
      return { data: { message: 'Ocorreu um erro inesperado' }, status: 500 }
    }
  }

  public async deleteProject(titleProject: string): Promise<MethodResponse<ProjetosType[] | { message: string }>> {
    try {
      const { data } = await this.allProjects();
      const projExists = data.some(e => e.title === titleProject);

      if (!projExists) {
        return { data: { message: 'Projeto não encontrado' }, status: 404 }
      }

      const dataWrite = await this.db.deleteFromFile("title", titleProject)
      return { data: dataWrite, status: 200 }
    } catch (err) {
      return { data: { message: 'Ocorreu um erro inesperado' }, status: 500 }
    }
  }

  public async editProject(fieldToCompair: string, valueToCompair: string, fieldsToEdit: string[], values: string[]): Promise<MethodResponse<ProjetosType | { message: string }>> {
    const data = await this.db.editFromFile(fieldToCompair, valueToCompair, fieldsToEdit, values);

    if ("message" in data) {
      return { data: { message: "Foi enviado valores ou campos a mais" }, status: 400 }
    }

    return { data, status: 200 }
  }

  public async projetosSync(actualProjects: ProjetosType[]): Promise<MethodResponse<{ message: string }>> {
    const data = await this.db.resetDB(actualProjects);
    return { data: { message: 'Projetos Sincronizadas' }, status: 200 }
  }
}