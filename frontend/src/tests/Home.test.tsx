import { vi } from 'vitest';
import Provider from '../Provider.tsx';
import { ProjetosType } from '../types.ts';
import { renderWithRouter } from './renderWithRouter.tsx';
import Home from '../routes/Home.tsx';
import HomeMock from './MockTest.ts';

const mocks = new HomeMock();

describe('Home tests', () => {
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

    const addButton = await screen.findByTestId('new-project-button');

    await user.click(addButton);

    const inputs = await screen.findAllByTestId('new-project-button');

    await user.type(inputs[0], 'test');
    await user.type(inputs[1], 'omaga its a amazing test');
    await user.type(inputs[2], 'react, typescript');
    await user.type(inputs[3], 'http://testandomuitooooo/');
    await user.type(inputs[4], 'http://testandomuitooooo2222/');

    const confirmProject = await screen.findByTestId('add-project-button');

    await user.click(confirmProject);

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
  it('Testa se é possivel remover um projeto', async () => {
    const { screen, user } = renderWithRouter(<Provider><Home /></Provider>);

    const inputs = await screen.findAllByTestId('delete-button');

    await user.click(inputs[0]);

    const confirmButton = await screen.findByTestId('confirm-button');

    await user.click(confirmButton);

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
