/* eslint-disable no-unused-vars */
import { ProjetosType, TecnologiaType } from '../types.ts';

export default interface Fetchs {
  getItems(): Promise<ProjetosType[] | TecnologiaType[]>;

  addItem(project: ProjetosType): Promise<ProjetosType[] | TecnologiaType[]>;

  removeItems(title: string): Promise<ProjetosType[] | TecnologiaType[]>;

  editItems(project: ProjetosType, actualTitle: string)
  : Promise<ProjetosType | TecnologiaType>;
}
