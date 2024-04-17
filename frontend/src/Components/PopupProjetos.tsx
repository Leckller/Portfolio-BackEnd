/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { ProjFields, ProjetosFieldsBool, ProjetosType } from '../types.ts';
import DatabaseFetch from '../service/DatabaseFetch.ts';
import Editable from './Editable.tsx';
import DivPopup from './DivPopup.tsx';

type PopupType = {
  open: boolean, projeto: ProjetosType
}

function PopupProjetos({ setPopup, popup }:
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
    <DivPopup>
      <button
        data-testid="close-popup"
        className="w-full text-end text-2xl font-bold pr-2 pt-1"
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

      <h2>Tecnologias</h2>
      <div className="flex flex-row gap-3 justify-center">
        {edit.tecnologias.sort((a, b) => a.length - b.length)
          .map((tec) => (
            <h5 className="p-1 rounded-md bg-white" key={ tec }>
              {tec}
            </h5>
          ))}
      </div>

      <button
        className="disabled:opacity-70 disabled:bg-red-200 bg-green-200 p-2"
        disabled={
          edit.describe === popup.projeto.describe
          && edit.gitHub === popup.projeto.gitHub
          && edit.tecnologias === popup.projeto.tecnologias
          && edit.title === popup.projeto.title && edit.url === popup.projeto.url
        }
        data-testid="save-edit"
        onClick={ () => {
          const db = new DatabaseFetch();
          db.editItems(edit, popup.projeto.title);
          setPopup({ open: false, projeto: {} as ProjetosType });
        } }
      >
        Salvar
      </button>
    </DivPopup>
  );
}

export default PopupProjetos;