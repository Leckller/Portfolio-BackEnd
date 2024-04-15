import App from '../App.tsx';
import Provider from '../Provider.tsx';
import { ProjetosType } from '../types.ts';
import { renderWithRouter } from './renderWithRouter.tsx';

const keypass = import.meta.env.VITE_LOGIN;
const secret = import.meta.env.VITE_SECRET;

describe('Login tests', () => {
  it('Testa se ao as credencias corretas espera que seja possivel ir para a rota home', async () => {
    const { screen, user, vi } = renderWithRouter(<Provider><App /></Provider>);

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => Promise.resolve({ data: [] as ProjetosType[] }),
    } as Response);

    const inputKey = screen.getByTestId('key');
    const inputPassword = screen.getByTestId('password');
    const buttonLogin = screen.getByTestId('login');

    expect(screen.getByText(/Super Secret Backend/i)).toBeInTheDocument();
    expect(inputKey).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();

    await user.type(inputKey, keypass);
    await user.type(inputPassword, secret);
    await user.click(buttonLogin);

    expect(window.location.href.includes('/home')).toBe(true);
  });
  it('Testa que não deve ser possivel acessar a rota home sem crendenciais validas', async () => {
    const { screen, user } = renderWithRouter(<Provider><App /></Provider>);
    expect(screen.getByText(/Super Secret Backend/i)).toBeInTheDocument();

    const inputKey = screen.getByTestId('key');
    const inputPassword = screen.getByTestId('password');
    const buttonLogin = screen.getByTestId('login');

    expect(inputKey).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();

    await user.type(inputKey, 'umaSenhaIncrivel');
    await user.type(inputPassword, 'outraSenhaSensacional');
    await user.click(buttonLogin);

    expect(window.location.href.includes('/home')).toBe(false);
  });
});
