import { vi } from 'vitest';
import Provider from '../Provider.tsx';
import { ProjetosType } from '../types.ts';
import { renderWithRouter } from './renderWithRouter.tsx';
import Home from '../routes/Home.tsx';

const keypass = import.meta.env.VITE_LOGIN;
const secret = import.meta.env.VITE_SECRET;

describe('Home tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => Promise.resolve({ data: [] as ProjetosType[] }),
    } as Response);
  });

  it('Testa se é possivel remover um projeto', async () => {
    const { screen, user } = renderWithRouter(<Provider><Home /></Provider>);
  });

  it('Testa se é possivel adicionar um novo projeto', async () => {
    const { screen, user } = renderWithRouter(<Provider><Home /></Provider>);
  });
  it('Testa se é possivel remover um projeto', async () => {
    const { screen, user } = renderWithRouter(<Provider><Home /></Provider>);
  });
});
