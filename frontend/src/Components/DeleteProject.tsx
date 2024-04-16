import { useState } from 'react';
import DivPopup from './DivPopup.tsx';
import Fetchs from '../interfaces/Fetchs.ts';

function DeleteProject({ title, DB }: {title: string, DB: Fetchs}) {
  const [confirm, setConfirm] = useState(false);

  return (
    <>
      {confirm && (
        <DivPopup>
          <h2 className="text-center text-xl">
            Tem certeza que você quer apagar o projeto
            <span className="text-2xl font-bold">{` "${title}"`}</span>
          </h2>
          <div className="flex flex-row justify-around">
            <button
              data-testid="confirm-button"
              className="w-20 p-5 border-gray-950 border-2"
              onClick={ () => {
                DB.removeItems(title);
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
