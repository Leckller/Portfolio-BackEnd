/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import { ProjetosType, TecnologiaType } from './types.ts';

type Popup<T> = {open: boolean, type: T};

type context = {
  login: boolean
  setLogin: (p:boolean) => void;
  tec: {
    setPopupTec: (p: Popup<TecnologiaType>) => void;
    popupTec: Popup<TecnologiaType>
  }
  proj: {
    setPopupProj: (p: Popup<ProjetosType>) => void;
    popupProj: Popup<ProjetosType>
  }
  data: { tecs: TecnologiaType[], projs: ProjetosType[]}
  setData: (p: {tecs: TecnologiaType[], projs: ProjetosType[]}) => void,
}

const Context = createContext({} as context);

export default Context;
