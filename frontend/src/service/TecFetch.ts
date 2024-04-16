import { TecnologiaType } from '../types.ts';

const authorization = import.meta.env.VITE_AUTH;
const url = import.meta.env.VITE_URL_TEC;

export default class TecFetch {
  public async getTecs(): Promise<TecnologiaType[]> {
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
}
