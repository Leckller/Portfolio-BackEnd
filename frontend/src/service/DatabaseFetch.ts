type ProjetosType = {
  title: string,
  describe: string,
  tecnologias: string[],
  url: string,
  gitHub: string,
};

const authorization = import.meta.env.AUTH;
const url = import.meta.env.URL;

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
}
