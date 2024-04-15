export type ProjetosType = {
  title: string,
  describe: string,
  tecnologias: string[],
  url: string,
  gitHub: string,
};

export type ProjetosFieldsBool = {
  describe: false,
  gitHub: false,
  tecnologias: false,
  title: false,
  url: false,
}

export type ProjFields = 'title' | 'url' | 'gitHub' | 'tecnologias' | 'describe'
