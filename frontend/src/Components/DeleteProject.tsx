import { useState } from 'react';
import DatabaseFetch from '../service/DatabaseFetch.ts';
import DivPopup from './DivPopup.tsx';

function DeleteProject({ title }: {title: string}) {
  const [confirm, setConfirm] = useState(false);
  const db = new DatabaseFetch();
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
              className="w-20 p-5 border-gray-950 border-2"
              onClick={ () => {
                db.removeProject(title);
                setConfirm(false);
              } }
            >
              Sim
            </button>
            <button
              className="w-20 p-5 border-gray-950 border-2"
              onClick={ () => setConfirm(false) }
            >
              Não
            </button>
          </div>
        </DivPopup>
      )}
      <button onClick={ () => setConfirm((prev) => !prev) }>
        Delete
      </button>
    </>
  );
}

export default DeleteProject;
