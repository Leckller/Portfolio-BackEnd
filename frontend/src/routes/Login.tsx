import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../Context.tsx';

const keypass = import.meta.env.VITE_LOGIN;
const secret = import.meta.env.VITE_SECRET;

function Login() {
  const provider = useContext(Context);
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = () => {
    if (login === keypass && secret === senha) {
      localStorage.setItem('login', login);
      localStorage.setItem('secret', secret);
      provider.setLogin(true);
      navigate('/home');
      return;
    }
    alert('tá errado o vacilão');
  };
  // melhor criptografar isso aq logo
  const localLogin = localStorage.getItem('login');
  const localSecret = localStorage.getItem('secret');

  if (localLogin === keypass && localSecret === secret) {
    provider.setLogin(true);
    navigate('/home');
    return;
  }

  return (
    <div className="flex flex-col items-center justify-around h-screen w-screen">
      <header className="h-[30%] text-center flex items-center">
        <h1 className="text-3xl font-bold">
          Super Secret Backend
        </h1>
      </header>

      <form
        className="h-[70%] flex flex-col gap-3 justify-center"
        onSubmit={ (e) => {
          e.preventDefault();
          handleSubmit();
        } }
      >
        <input
          className="border-2 border-black rounded-md"
          data-testid="key"
          onChange={ ({ target: { value } }) => setLogin(value) }
          value={ login }
          type="text"
        />

        <input
          data-testid="password"
          className="border-2 border-black rounded-md"
          onChange={ ({ target: { value } }) => setSenha(value) }
          value={ senha }
          type="password"
        />

        <button type="submit" data-testid="login">Logar</button>
      </form>
    </div>
  );
}

export default Login;
