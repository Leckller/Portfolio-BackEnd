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
      provider.setLogin(true);
      navigate('/home');
      return;
    }
    alert('tá errado o vacilão');
  };
  return (
    <div>
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          handleSubmit();
        } }
      >
        <input
          onChange={ ({ target: { value } }) => setLogin(value) }
          value={ login }
          type="text"
        />

        <input
          onChange={ ({ target: { value } }) => setSenha(value) }
          value={ senha }
          type="password"
        />

        <button type="submit">Logar</button>
      </form>
    </div>
  );
}

export default Login;
