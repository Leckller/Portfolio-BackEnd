import { ProjetosType } from "../../src/types";

export default class DatabaseMock {
  public BufferProjects() {
    return {
      data: {
        type: 'Buffer',
        data: [
          91, 10, 32, 32, 123, 10, 32, 32, 32, 32, 34, 116,
          105, 116, 108, 101, 34, 58, 32, 34, 102, 97, 107, 101,
          45, 73, 116, 117, 110, 110, 101, 115, 34, 44, 10, 32,
          32, 32, 32, 34, 117, 114, 108, 34, 58, 32, 34, 104,
          116, 116, 112, 115, 58, 47, 47, 114, 117, 121, 45, 116,
          117, 110, 101, 115, 46, 118, 101, 114, 99, 101, 108, 46,
          97, 112, 112, 47, 34, 44, 10, 32, 32, 32, 32, 34,
          100, 101, 115, 99, 114, 105, 98, 101, 34, 58, 32, 34,
          68, 101, 115, 99
        ]
      }
    }

  }
  public Projects(): ProjetosType[] {
    return [
      {
        "title": "fake-Itunnes",
        "url": "https://ruy-tunes.vercel.app/",
        "describe": "Descubra uma nova dimensão musical com o ruyTunes, o aplicativo de música que transforma sua experiência auditiva. Explore uma vasta biblioteca de músicas de alta qualidade diretamente do iTunes, proporcionando acesso instantâneo a milhões de faixas.",
        "tecnologias": [
          "React",
          "Redux",
          "Redux-Thunk",
          "Styled-Components",
          "React-Router-Dom",
          "Vite",
          "TypeScript"
        ],
        "gitHub": "https://github.com/Leckller/ruyTunes"
      },
      {
        "title": "previsão do tempo",
        "url": "https: //ruy-tempo.vercel.app/",
        "describe": "Um app de previsão do tempo",
        "tecnologias": [
          "React",
          "Tailwind",
          "Vite",
          "TypeScript"
        ],
        "gitHub": "https://github.com/Leckller/previsaoDoTempo"
      },
      {
        "title": "Jogo Da Velha",
        "url": "https://jogo-da-veia.vercel.app/",
        "describe": "Um jogo da velha feito em react",
        "tecnologias": [
          "React",
          "Redux",
          "Styled-Components",
          "React-Router-Dom",
          "Vite",
          "TypeScript"
        ],
        "gitHub": "https://github.com/Leckller/jogoDaVeia"
      },
    ]
  }
}