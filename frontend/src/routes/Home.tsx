import { useEffect, useState } from 'react';
import { ProjetosType } from '../types.ts';
import DatabaseFetch from '../service/DatabaseFetch.ts';
import Popup from '../Components/Popup.tsx';
import DeleteProject from '../Components/DeleteProject.tsx';
import AddProject from '../Components/AddProject.tsx';

function Home() {
  const [projetos, setProjetos] = useState<ProjetosType[]>([]);
  const db = new DatabaseFetch();
  const [popup, setPopup] = useState({ open: false, projeto: {} as ProjetosType });
  const [newProj, setNewProj] = useState({ open: false, newProject: {} as ProjetosType });

  useEffect(() => {
    db.getProjects().then((e) => setProjetos(e));
  }, []);

  const handleClick = (projeto: ProjetosType) => {
    setPopup({ open: !popup.open, projeto });
  };

  return (
    <div className="w-screen h-screen">
      {popup.open && (<Popup popup={ popup } setPopup={ setPopup } />)}

      { newProj.open && (<AddProject newProj={ newProj } setNewProj={ setNewProj } />)}

      <header className="p-5">
        <button
          onClick={ () => setNewProj({ open: true,
            newProject: {} as ProjetosType }) }
        >
          Adicionar Projeto
        </button>
      </header>

      <main className="flex flex-col items-center gap-3 p-5">
        {projetos.length > 0 ? projetos.map((proj) => (
          <div
            key={ proj.title }
            className="flex flex-row gap-5 w-[300px] text-left"
          >
            <button
              className="text-2xl font-bold border-2 rounded-md border-black p-1"
              onClick={ () => handleClick(proj) }
            >
              <h2>{proj.title}</h2>
            </button>
            <DeleteProject title={ proj.title } />
          </div>
        )) : <div>Loading</div>}
      </main>
    </div>
  );
}

export default Home;
