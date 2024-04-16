import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const titleHeader = useLocation().pathname;
  return (
    <div>
      <header className="p-5">
        <button
          data-testid="new-project-button"
        >
          {`Adicionar ${titleHeader.includes('home') ? 'Projeto' : 'Tecnologia'}`}
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
