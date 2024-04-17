import path from 'path'
import FileSystemDB from '../utils/FileSystemDB';
import { TecnologiaType } from '../types';

type Message = { message: string }

type MethodResponse<T> = { data: T, status: number }


export default class Tecnologies {

  private db = new FileSystemDB(path.resolve(__dirname, './tecnologias.json'))

  public async getTecnologies(): Promise<MethodResponse<TecnologiaType[]>> {
    const data = await this.db.readFile() as TecnologiaType[];
    const sortedData = data.sort((a, b) => {
      if (a.type !== 'language' && b.type === 'language') return 1;
      if (a.type !== 'language' && b.type !== 'language') {
        if (b.type === 'environment') return 1;
        if (a.type !== 'environment' && b.type !== 'environment') {
          if (b.type === 'framework') return 1;
          if (a.type !== 'framework' && b.type !== 'framework') {
            if (b.type === 'db') return 1;
            if (a.type !== 'db' && b.type !== 'db') {
              if (b.type === 'style') return 1;
            }
          }
        }
      }
      return -1;
    });
    return { data: sortedData, status: 200 };
  }

  public async addTecnology(tecnology: TecnologiaType): Promise<MethodResponse<TecnologiaType[]>> {
    const data = await this.db.writeFile(tecnology);
    return { data, status: 201 };
  }
  public async editTecnology(fieldToCompair: string, valueToCompair: string, fieldsToEdit: string[], values: string[]): Promise<MethodResponse<TecnologiaType | Message>> {
    const data = await this.db.editFromFile(fieldToCompair, valueToCompair, fieldsToEdit, values);
    if ("message" in data) {
      return { data: { message: "Foi enviado valores ou campos a mais" }, status: 400 }
    }

    return { data, status: 200 };

  }
  public async removeTecnology(field: string, value: string): Promise<MethodResponse<TecnologiaType[]>> {
    const data = await this.db.deleteFromFile(field, value);

    return { data, status: 200 };
  }
}