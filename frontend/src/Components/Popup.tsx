/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { ProjFields, ProjetosFieldsBool, ProjetosType } from '../types.ts';
import DatabaseFetch from '../service/DatabaseFetch.ts';
import Editable from './Editable.tsx';

type PopupType = {
  open: boolean, projeto: ProjetosType
}

function Popup({ setPopup, popup }:
   {setPopup: (p: PopupType) => void, popup: PopupType}) {
  const [edit, setEdit] = useState<ProjetosType>(popup.projeto);
  const [fields, setFields] = useState<ProjetosFieldsBool>({
    describe: false,
    gitHub: false,
    tecnologias: false,
    title: false,
    url: false,
  });
  const fieldsArray: ProjFields[] = ['title', 'describe', 'gitHub', 'url'];

  const handleFields = (field: ProjFields) => {
    setFields({ ...fields, [field]: !fields[field] });
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <button
        onClick={ () => setPopup({ open: false, projeto: {} as ProjetosType }) }
      >
        X
      </button>

      {fieldsArray.map((campo) => (
        <Editable
          key={ campo }
          edit={ edit }
          field={ campo }
          fields={ fields }
          handleFields={ handleFields }
          setEdit={ setEdit }
          text={ edit[campo] as string }
        />
      ))}

      <div>
        {edit.tecnologias.sort((a, b) => a.length - b.length)
          .map((tec) => (
            <h5 key={ tec }>
              {tec}
            </h5>
          ))}
      </div>

      <div className="flex flex-row gap-2">
        <button
          className="disabled:opacity-20"
          disabled={
            edit.describe === popup.projeto.describe
          && edit.gitHub === popup.projeto.gitHub
          && edit.tecnologias === popup.projeto.tecnologias
          && edit.title === popup.projeto.title && edit.url === popup.projeto.url
          }
          onClick={ () => {
            const db = new DatabaseFetch();
            db.editProject(edit, popup.projeto.title);
            setPopup({ open: false, projeto: {} as ProjetosType });
          } }
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

export default Popup;
