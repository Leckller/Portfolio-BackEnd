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

export type TecnologiaType = {
  title: string,
  img: string
  type: number
}

export type ProjFields = 'title' | 'url' | 'gitHub' | 'tecnologias' | 'describe'
export type TecFields = 'title' | 'img' |'type'
