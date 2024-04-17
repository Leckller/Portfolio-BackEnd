import { useContext, useState } from 'react';
import { TecnologiaType } from '../types.ts';
import TecFetch from '../service/TecFetch.ts';
import DeleteProject from './DeleteProject.tsx';
import Context from '../Context.tsx';
import PopupTecnology from './PopupTecnology.tsx';

function Tecnologies() {
  const [popup, setPopup] = useState({ open: false,
    tecnology: {} as TecnologiaType,
    title: '' });
  const db = new TecFetch();
  const { data } = useContext(Context);

  const handleClick = (tecnology: TecnologiaType) => {
    setPopup({ open: !popup.open, tecnology, title: tecnology.title });
  };

  return (
    <main className="flex flex-row flex-wrap gap-3 overflow-auto h-full">
      {popup.open && <PopupTecnology DB={ db } popup={ popup } setPopup={ setPopup } />}
      {data.tecs.length > 0 ? data.tecs.map((tec) => (
        <div
          key={ tec.title }
          className="flex flex-col gap-5 max-h-[300px] max-w-[200px]
           items-center justify-evenly text-left
           text-2xl font-bold border-2 rounded-md border-black p-5"
        >
          <button
            data-testid="tecnology"
            className="flex flex-col items-center justify-evenly"
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
