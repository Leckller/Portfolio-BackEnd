/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProjFields, ProjetosType } from '../types.ts';
import DatabaseFetch from '../service/DatabaseFetch.ts';
import DivPopup from './DivPopup.tsx';
import Context from '../Context.tsx';

type PopupType = {
  title: string,
  open: boolean, projeto: ProjetosType
}

function PopupProjetos({ setPopup, popup }:
  {setPopup: (p: PopupType) => void, popup: PopupType}) {
  const [newTec, setNewTec] = useState('');
  const { data, setData } = useContext(Context);
  const fieldsArray: ProjFields[] = ['title', 'describe', 'url', 'gitHub'];
  const fieldsToDB: ProjFields[] = ['title', 'url', 'describe', 'tecnologias', 'gitHub'];
  const isHome = useLocation().pathname.includes('home') ? 'projs' : 'tecs';
  const indexItem = data[isHome].findIndex((item) => item.title === popup.title);
  return (
    <DivPopup>
      <button
        data-testid="close-popup"
        className="w-full text-end text-2xl font-bold pr-2 pt-1"
        onClick={ () => setPopup({ open: false,
          projeto: {} as ProjetosType,
          title: '' }) }
      >
        X
      </button>

      {fieldsArray.map((p) => (
        <label
          className="flex flex-col"
          key={ p }
        >
          {p}
          <textarea
            className="resize-none"
            value={ popup.projeto[p] }
            onChange={ ({ target: { value } }) => setPopup({
              open: true,
              projeto: { ...popup.projeto, [p]: value },
              title: popup.title }) }
          />
        </label>
      ))}

      <div>
        <h2>Tecnologias</h2>
        <div className="flex flex-row gap-2">
          <input
            className="rounded-md"
            type="text"
            value={ newTec }
            onChange={ ({ target: { value } }) => setNewTec(value) }
          />
          <button
            className="bg-white p-2 rounded-full w-10 h-10"
            onClick={ () => {
              if (popup.projeto.tecnologias.some((t) => t === newTec)
              || newTec.length < 2) {
                return console.log('Essa tecnologia já existe ou o input está vazio');
              }
              const tecnologias = [...popup.projeto.tecnologias, newTec];
              setPopup({ ...popup,
                projeto: {
                  ...popup.projeto,
                  tecnologias,
                } });
              setNewTec('');
            } }
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-3 justify-center">
        {popup.projeto.tecnologias.sort((a, b) => a.length - b.length)
          .map((tec) => (
            <div className="flex flex-row gap-3 p-1 rounded-md bg-white" key={ tec }>
              <h3>{tec}</h3>
              <button
                onClick={ () => {
                  const tecnologias = popup.projeto.tecnologias.filter((t) => t !== tec);
                  setPopup({ ...popup,
                    projeto: {
                      ...popup.projeto,
                      tecnologias,
                    } });
                } }
              >
                X
              </button>
            </div>
          ))}
      </div>

      <button
        className="disabled:opacity-70 disabled:bg-red-200 bg-green-200 p-2"
        data-testid="save-edit"
        onClick={ () => {
          const db = new DatabaseFetch();
          db.editItems(
            popup.projeto.title,
            fieldsToDB,
            Object.values(popup.projeto) as string[],
          ).then((resp) => {
            data[isHome][indexItem] = resp;
            setData(data);
          });
          setPopup({ open: false, projeto: {} as ProjetosType, title: '' });
        } }
      >
        Salvar
      </button>
    </DivPopup>
  );
}

export default PopupProjetos;
