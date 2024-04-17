import { useContext, useState } from 'react';
import Context from '../Context.tsx';
import DatabaseFetch from '../service/DatabaseFetch.ts';
import DeleteProject from './DeleteProject.tsx';
import { ProjetosType } from '../types.ts';
import PopupProjetos from './PopupProjetos.tsx';

function Projetos() {
  const [popup, setPopup] = useState({ open: false, projeto: {} as ProjetosType });
  const { data } = useContext(Context);
  const projDB = new DatabaseFetch();

  const handleClick = (projeto: ProjetosType) => {
    setPopup({ open: !popup.open, projeto });
  };

  return (
    <main className="flex flex-col items-center gap-3 p-5">
      {popup.open && (<PopupProjetos popup={ popup } setPopup={ setPopup } />)}

      {data.projs.length > 0 ? data.projs.map((p) => (
        <div
          key={ p.title }
          className="flex flex-row gap-5 w-[300px] text-left"
        >
          <button
            data-testid="project"
            className="text-2xl font-bold border-2 rounded-md border-black p-1"
            onClick={ () => handleClick(p) }
          >
            <h2>{p.title}</h2>
          </button>
          <DeleteProject DB={ projDB } title={ p.title } />
        </div>
      )) : <div>Loading</div>}
    </main>
  );
}

export default Projetos;
