import { ProjetosType } from '../types.ts';

const authorization = import.meta.env.VITE_AUTH;
const url = import.meta.env.VITE_URL;

export default class DatabaseFetch {
  public async getProjects(): Promise<ProjetosType[]> {
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

  public async editProject(project: ProjetosType, actualTitle: string)
  : Promise<{message: string}> {
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

  public async addProject(project: ProjetosType): Promise<{message: string}> {
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

  public async removeProject(title: string): Promise<{message: string}> {
    const Request = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(title),
      headers: {
        'Content-Type': 'application/json',
        authorization,
      },
    });
    const Response = await Request.json();
    return Response.data;
  }
}
