import fs from 'fs/promises';
import path from 'path';
import { ProjetosType } from '../types';

class Database {
  public async allProjects(): Promise<ProjetosType[]> {
    const data = await fs.readFile(path.resolve(__dirname, './projetos.json'));
    return data as unknown as ProjetosType[];
  }
  public async addProject(newProject: ProjetosType): Promise<string> {
    const { describe, gitHub, tecnologias, title, url } = newProject;
    if (!describe || !gitHub || !tecnologias || !title || !url) return 'Preencha todos os campos'
  }
}