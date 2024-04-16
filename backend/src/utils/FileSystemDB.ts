import fs from 'fs/promises'

export default class FileSystemDB {
  private pathFile: string

  constructor(pathFile: string) {
    this.pathFile = pathFile;
  }

  public async readFile(): Promise<any[]> {
    const data = await fs.readFile(this.pathFile);
    const json = JSON.parse(data.toString());
    return json;
  }

  public async writeFile(newData: any): Promise<any[]> {
    const data = await this.readFile();
    data.push(newData);

    await fs.writeFile(this.pathFile, JSON.stringify([...data]));

    return data;
  }

  public async deleteFromFile(field: string, value: string): Promise<any[]> {
    const data = await this.readFile();
    const filtredData = data.filter(e => e[field] !== value);

    await fs.writeFile(this.pathFile, JSON.stringify([...filtredData]));

    return filtredData;
  }

  public async editFromFile(fieldToCompair: string, valueToCompair: string, fieldsToEdit: string[], values: string[]): Promise<any> {
    if (fieldsToEdit.length !== values.length) {
      return { message: "Foi enviado valores ou campos a mais" }
    }

    const data = await this.readFile();
    const indexItem = data.findIndex(e => e[fieldToCompair] === valueToCompair);

    for (let i = 0; i < fieldsToEdit.length; i++) {
      data[indexItem][fieldsToEdit[i]] = values[i];
    }

    await fs.writeFile(this.pathFile, JSON.stringify([...data]));

    return data[data.length - 1];
  }
}