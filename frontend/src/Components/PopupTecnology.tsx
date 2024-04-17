import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Fetchs from '../interfaces/Fetchs.ts';
import { TecFields, TecnologiaType } from '../types.ts';
import DivPopup from './DivPopup.tsx';
import Context from '../Context.tsx';

type PopupType = {
  open: boolean,
  tecnology: TecnologiaType
  title: string
}

const tecFields = ['title', 'img', 'type'] as TecFields[];

function PopupTecnology({ setPopup, popup, DB }:
  // eslint-disable-next-line no-unused-vars
  {setPopup: (p: PopupType) => void, popup: PopupType, DB: Fetchs}) {
  const isHome = useLocation().pathname.includes('home') ? 'projs' : 'tecs';
  const { data, setData } = useContext(Context);
  const indexItem = data[isHome].findIndex((item) => item.title === popup.title);
  return (
    <DivPopup>
      <div className="w-full h-full flex flex-col justify-between p-2">
        <button
          className="text-2xl font-bold w-full text-end"
          onClick={ () => setPopup({ open: false,
            tecnology: {} as TecnologiaType,
            title: popup.title }) }
        >
          X
        </button>
        <div className="w-full flex justify-center">
          <img
            className="w-[100px] h-[100px]"
            src={ popup.tecnology.img }
            alt="preview"
          />
        </div>
        {tecFields.map((f) => (
          <label
            className="flex flex-col"
            key={ f }
          >
            {f}
            <textarea
              className="resize-none"
              value={ popup.tecnology[f] }
              onChange={ ({ target: { value } }) => setPopup({
                open: true,
                tecnology: { ...popup.tecnology, [f]: value },
                title: popup.title }) }
            />
          </label>
        ))}
        <button
          className="w-full max-w-[300px] p-2"
          onClick={ () => {
            DB.editItems(
              popup.title,
              tecFields,
              Object.values(popup.tecnology) as string[],
            ).then((resp) => {
              data[isHome][indexItem] = resp;
              setData(data);
            });
          } }
        >
          Salvar
        </button>
      </div>
    </DivPopup>
  );
}

export default PopupTecnology;
