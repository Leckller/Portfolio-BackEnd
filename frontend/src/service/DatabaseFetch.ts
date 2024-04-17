import { ProjetosType } from '../types.ts';
import Fetchs from '../interfaces/Fetchs.ts';

const authorization = import.meta.env.VITE_AUTH;
const url = import.meta.env.VITE_URL_PROJ;
const urlSync = import.meta.env.VITE_URL_PROJ_SYNC;

export default class DatabaseFetch implements Fetchs {
  public async getItems(): Promise<ProjetosType[]> {
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

  public async editItems(title: string, fields: string[], values: string[])
  : Promise<ProjetosType> {
    const Request = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({ title, fields, values }),
      headers: {
        'Content-Type': 'application/json',
        authorization,
      },
    });
    const Response = await Request.json();
    return Response.data;
  }

  public async addItem(project: ProjetosType): Promise<ProjetosType[]> {
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

  public async removeItems(title: string): Promise<ProjetosType[]> {
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

  public async syncItems(acutalProjects: ProjetosType[]): Promise<{message: string}> {
    const Request = await fetch(urlSync, {
      method: 'post',
      body: JSON.stringify({ acutalProjects }),
      headers: {
        'Content-Type': 'application/json',
        authorization,
      },
    });
    const Response = await Request.json();
    return Response.data;
  }
}
