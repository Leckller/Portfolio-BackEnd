/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { ProjetosType } from '../types.ts';
import DatabaseFetch from '../service/DatabaseFetch.ts';

type PopupType = {
  open: boolean, projeto: ProjetosType
}

function Popup({ setPopup, popup }:
   {setPopup: (p: PopupType) => void, popup: PopupType}) {
  const [edit, setEdit] = useState<ProjetosType>(popup.projeto);
  const [fields, setFields] = useState({
    describe: false,
    gitHub: false,
    tecnologias: false,
    title: false,
    url: false,
  });

  const handleFields = (field: string) => {
    setFields({ ...fields, [field]: !fields.title });
  };

  return (
    <div>
      <button
        onClick={ () => setPopup({ open: false, projeto: {} as ProjetosType }) }
      >
        X
      </button>

      <div className="flex flex-row gap-2">
        {fields.title ? (
          <input
            type="text"
            value={ edit.title }
            onChange={ ({ target: { value } }) => setEdit({ ...edit, title: value }) }
          />
        ) : (
          <h2>{edit.title}</h2>
        )}
        <button
          onClick={ () => handleFields('title') }
        >
          ----E----
        </button>
      </div>

      <p className="mb-3">{edit.describe}</p>
      <div>
        {edit.tecnologias.sort((a, b) => a.length - b.length)
          .map((tec) => (
            <h5 key={ tec }>
              {tec}
            </h5>
          ))}
      </div>

      <button
        className="disabled:opacity-20"
        disabled={
          edit.describe === popup.projeto.describe
          && edit.gitHub === popup.projeto.gitHub
          && edit.tecnologias === popup.projeto.tecnologias
          && edit.title === popup.projeto.title && edit.url === popup.projeto.url
        }
        onClick={ () => {
          const effect = async () => {
            const db = new DatabaseFetch();
            const resp = await db.editProject(edit, popup.projeto.title);
            console.log(resp);
            setPopup({ open: false, projeto: {} as ProjetosType });
          };
          effect();
        } }
      >
        Salvar
      </button>
    </div>
  );
}

export default Popup;
