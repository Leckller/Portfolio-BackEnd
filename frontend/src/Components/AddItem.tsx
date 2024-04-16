import { useContext } from 'react';
import { ProjFields, ProjetosType, TecFields, TecnologiaType } from '../types.ts';
import DivPopup from './DivPopup.tsx';
import Context from '../Context.tsx';
import Fetchs from '../interfaces/Fetchs.ts';

const typeFields = {
  tec: ['title', 'img', 'type'] as TecFields[],
  proj: ['title', 'describe', 'tecnologias', 'gitHub', 'url'] as ProjFields[],
};

function AddItem({ db }: {db: Fetchs}) {
  const { tec, proj } = useContext(Context);

  const handleAddProject = (field: ProjFields | TecFields, value: string) => {
    if (tec.popupTec.open) {
      tec.setPopupTec({ ...tec.popupTec,
        type: { ...tec.popupTec.type, [field]: value } }); return;
    }
    proj.setPopupProj({ ...proj.popupProj,
      type: { ...proj.popupProj.type, [field]: value } });
  };
  return (
    <DivPopup>
      <button
        className="w-full text-end"
        onClick={ () => {
          if (tec.popupTec.open) {
            tec.setPopupTec({ type: {} as TecnologiaType, open: false });
            return;
          }
          proj.setPopupProj({ type: {} as ProjetosType, open: false });
        } }
      >
        X
      </button>

      <div className="flex flex-col gap-5 items-start">
        {tec.popupTec.open ? (
          typeFields.tec.map((f) => (
            <label key={ f } className="flex flex-col w-full ">
              {f}
              <textarea
                className="resize-none w-full"
                data-testid="new-project-button"
                onChange={ ({ target: { value } }) => {
                  handleAddProject(f, value);
                } }
              />
            </label>
          ))
        ) : (
          typeFields.proj.map((f) => (
            <label key={ f } className="flex flex-col w-full ">
              {f}
              <textarea
                className="resize-none w-full"
                data-testid="new-project-button"
                onChange={ ({ target: { value } }) => {
                  handleAddProject(f, value);
                } }
              />
            </label>
          ))
        )}
      </div>

      <button
        data-testid="add-project-button"
        onClick={ () => {
          if (tec.popupTec.open) {
            db.addItem(tec.popupTec.type);
            tec.setPopupTec({ type: {} as TecnologiaType, open: false });
            return;
          }
          db.addItem(proj.popupProj.type);
          proj.setPopupProj({ type: {} as ProjetosType, open: false });
        } }
      >
        Adicionar
      </button>
    </DivPopup>
  );
}

export default AddItem;
