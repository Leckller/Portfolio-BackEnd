import { ProjetosType } from '../types.ts';

export default class HomeMock {
  public fakeProjects(): ProjetosType[] {
    return [
      {
        title: 'itunes',
        url: 'https://ruy-tunes.vercel.app/',
        describe: 'Descubra uma nova dimensão musical com o ruyTunes, o aplicativo de música que transforma sua experiência auditiva. Explore uma vasta biblioteca de músicas de alta qualidade diretamente do iTunes, proporcionando acesso instantâneo a milhões de faixas.',
        tecnologias: [
          'Vite',
          'React',
          'Redux',
          'TypeScript',
          'Redux-Thunk',
          'React-Router-Dom',
          'Styled-Components',
        ],
        gitHub: 'https://github.com/Leckller/ruyTunes',
      },
      {
        title: 'Previsão do tempo',
        url: 'https: //ruy-tempo.vercel.app/',
        describe: 'Um app de previsão do tempo',
        tecnologias: [
          'Vite',
          'React',
          'Tailwind',
          'TypeScript',
        ],
        gitHub: 'Um app de previsão do tempo',
      },
    ];
  }
}
