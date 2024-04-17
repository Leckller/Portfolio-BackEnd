import { useContext } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Context from '../Context.tsx';
import { ProjetosType, TecnologiaType } from '../types.ts';

function Layout() {
  const titleHeader = useLocation().pathname;
  const inHome = titleHeader.includes('home');
  const { tec, proj } = useContext(Context);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-around ">
      <header className="p-5 flex flex-row justify-between">
        <button
          data-testid="new-project-button"
          onClick={ () => {
            if (inHome) {
              proj.setPopupProj({ open: true, type: {} as ProjetosType });
              return;
            }
            tec.setPopupTec({ open: true, type: {} as TecnologiaType });
          } }
        >
          {`Adicionar ${inHome ? 'Projeto' : 'Tecnologia'}`}
        </button>

        <button onClick={ () => navigate(inHome ? '/tec' : '/home') }>
          {inHome ? 'Tecnologias' : 'Projetos'}
        </button>
      </header>

      <Outlet />

      <footer>
        Created By Ruy
      </footer>
    </div>
  );
}

export default Layout;
