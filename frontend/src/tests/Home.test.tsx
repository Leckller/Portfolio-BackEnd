import { vi } from 'vitest';
import Provider from '../Provider.tsx';
import { ProjetosType } from '../types.ts';
import { renderWithRouter } from './renderWithRouter.tsx';
import Home from '../routes/Home.tsx';
import HomeMock from './MockTest.ts';

const mocks = new HomeMock();

describe.only('Home tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => Promise.resolve({ data: mocks.fakeProjects() as ProjetosType[] }),
    } as Response);
  });

  it('Testa se aparecem na tela os projetos retornados pelo db', async () => {
    const { screen } = renderWithRouter(<Provider><Home /></Provider>);

    const projetos = await screen.findAllByTestId('project');

    expect(projetos.length).toBe(2);
  });

  it('Testa se é possivel editar um projeto', async () => {
    const { screen, user } = renderWithRouter(<Provider><Home /></Provider>);

    const projetos = await screen.findAllByTestId('project');
    await user.click(projetos[0]);

    const buttons = await screen.findAllByTestId('button');
    await user.click(buttons[0]);

    const textareas = await screen.findAllByTestId('textarea');
    await user.type(textareas[0], 'fake-itunes!');

    const saveButton = await screen.findByTestId('save-edit');
    await user.click(buttons[0]);
    await user.click(saveButton);

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('Testa se é possivel adicionar um novo projeto', async () => {
    const { screen, user } = renderWithRouter(<Provider><Home /></Provider>);
  });
  it('Testa se é possivel remover um projeto', async () => {
    const { screen, user } = renderWithRouter(<Provider><Home /></Provider>);
  });
});
