/* eslint-disable no-unused-vars */
import { ProjetosType, TecnologiaType } from '../types.ts';

export default interface Fetchs {
  getItems(): Promise<ProjetosType[] | TecnologiaType[]>;

  addItem(item: ProjetosType | TecnologiaType)
  : Promise<ProjetosType[] | TecnologiaType[]>;

  removeItems(title: string): Promise<ProjetosType[] | TecnologiaType[]>;

  editItems(title: string, fields: string[], values: string[])
  : Promise<ProjetosType | TecnologiaType>;

  syncItems(actualItens: ProjetosType[] | TecnologiaType[]): Promise<{message: string}>
}
