import { useEffect, useState } from 'react';
import { TecnologiaType } from '../types.ts';
import TecFetch from '../service/TecFetch.ts';
import DeleteProject from './DeleteProject.tsx';

function Tecnologies() {
  const [tecs, setTecs] = useState<TecnologiaType[]>([]);
  const [popup, setPopup] = useState({ open: false, projeto: {} as TecnologiaType });
  const db = new TecFetch();

  useEffect(() => {
    db.getItems().then((e) => setTecs(e));
  }, []);

  const handleClick = (projeto: TecnologiaType) => {
    setPopup({ open: !popup.open, projeto });
  };

  return (
    <main>
      {tecs.length > 0 ? tecs.map((tec) => (
        <div
          key={ tec.title }
          className="flex flex-row gap-5 w-[300px] text-left"
        >
          <button
            data-testid="tecnology"
            className="text-2xl font-bold border-2 rounded-md border-black p-1"
            onClick={ () => handleClick(tec) }
          >
            <h2>{tec.title}</h2>
            <img src={ tec.img } alt={ tec.title } />
          </button>
          <DeleteProject title={ tec.title } DB={ db } />
        </div>
      )) : <div>Loading</div>}
    </main>
  );
}

export default Tecnologies;
