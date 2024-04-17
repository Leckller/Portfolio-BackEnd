import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DivPopup from './DivPopup.tsx';
import Fetchs from '../interfaces/Fetchs.ts';
import Context from '../Context.tsx';
import { ProjetosType, TecnologiaType } from '../types.ts';

function DeleteProject({ title, DB }: {title: string, DB: Fetchs}) {
  const [confirm, setConfirm] = useState(false);
  const { pathname } = useLocation();
  const { data, setData } = useContext(Context);

  return (
    <>
      {confirm && (
        <DivPopup>
          <h2 className="text-center text-xl">
            {`Tem certeza que você quer apagar 
            ${pathname.includes('home') ? 'o projeto' : 'a tecnologia'}`}
            <span className="text-2xl font-bold">{` "${title}"`}</span>
          </h2>
          <div className="flex flex-row justify-around">
            <button
              data-testid="confirm-button"
              className="w-20 p-5 border-gray-950 border-2"
              onClick={ () => {
                DB.removeItems(title).then((resp) => {
                  if (pathname.includes('home')) {
                    setData({ projs: resp as ProjetosType[], tecs: data.tecs });
                    return;
                  }
                  setData({ projs: data.projs, tecs: resp as TecnologiaType[] });
                });
                setConfirm(false);
              } }
            >
              Sim
            </button>
            <button
              data-testid="cancel-button"
              className="w-20 p-5 border-gray-950 border-2"
              onClick={ () => setConfirm(false) }
            >
              Não
            </button>
          </div>
        </DivPopup>
      )}
      <button
        data-testid="delete-button"
        onClick={ () => setConfirm((prev) => !prev) }
      >
        Delete
      </button>
    </>
  );
}

export default DeleteProject;
