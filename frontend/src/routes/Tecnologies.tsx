import { useEffect, useState } from 'react';
import { TecnologiaType } from '../types.ts';
import TecFetch from '../service/TecFetch.ts';
import DeleteProject from '../Components/DeleteProject.tsx';

function Tecnologies() {
  const [tecs, setTecs] = useState<TecnologiaType[]>([]);
  const [popup, setPopup] = useState({ open: false, projeto: {} as TecnologiaType });
  const db = new TecFetch();

  useEffect(() => {
    db.getTecs().then((e) => setTecs(e));
  }, []);

  const handleClick = (projeto: TecnologiaType) => {
    setPopup({ open: !popup.open, projeto });
  };

  return (
    <div className="w-screen h-screen">
      <header className="p-5">
        <button
          data-testid="new-project-button"
        >
          Adicionar Tecnologia
        </button>
      </header>

      <main>
        {tecs.length > 0 ? tecs.map((proj) => (
          <div
            key={ proj.title }
            className="flex flex-row gap-5 w-[300px] text-left"
          >
            <button
              data-testid="project"
              className="text-2xl font-bold border-2 rounded-md border-black p-1"
              onClick={ () => handleClick(proj) }
            >
              <h2>{proj.title}</h2>
            </button>
            <DeleteProject title={ proj.title } DB={ db } />
          </div>
        )) : <div>Loading</div>}
      </main>
    </div>
  );
}

export default Tecnologies;
