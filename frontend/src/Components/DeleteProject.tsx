import { useState } from 'react';
import DatabaseFetch from '../service/DatabaseFetch.ts';

function DeleteProject({ title }: {title: string}) {
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      {confirm && (
        <div
          className="fixed left-[10%] top-[10%] w-[80%] h-[50%]
         bg-slate-400 flex flex-col justify-evenly gap-5"
        >
          <h2 className="text-center text-xl">
            Tem certeza que você quer apagar o projeto:
            <span className="text-2xl font-bold">{` ${title}`}</span>
          </h2>
          <div className="flex flex-row justify-around">
            <button
              className="w-20 p-5 border-gray-950 border-2"
              onClick={ () => {
                const db = new DatabaseFetch();
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
        </div>
      )}
      <button onClick={ () => setConfirm((prev) => !prev) }>
        Delete
      </button>
    </>
  );
}

export default DeleteProject;
