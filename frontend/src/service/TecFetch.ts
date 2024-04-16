import Fetchs from '../interfaces/Fetchs.ts';
import { TecnologiaType } from '../types.ts';

const authorization = import.meta.env.VITE_AUTH;
const url = import.meta.env.VITE_URL_TEC;

export default class TecFetch implements Fetchs {
  public async getItems(): Promise<TecnologiaType[]> {
    const Request = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization,
      },
    });
    const Response = await Request.json();
    return Response.data;
  }

  public async editItems(project: TecnologiaType, actualTitle: string)
  : Promise<TecnologiaType> {
    const Request = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({ ...project, actualTitle }),
      headers: {
        'Content-Type': 'application/json',
        authorization,
      },
    });
    const Response = await Request.json();
    return Response.data;
  }

  public async addItem(project: TecnologiaType): Promise<TecnologiaType[]> {
    const Request = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json',
        authorization,
      },
    });
    const Response = await Request.json();
    return Response.data;
  }

  public async removeItems(title: string): Promise<TecnologiaType[]> {
    const Request = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({ title }),
      headers: {
        'Content-Type': 'application/json',
        authorization,
      },
    });
    const Response = await Request.json();
    return Response.data;
  }
}
