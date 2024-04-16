/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import { ProjetosType, TecnologiaType } from './types.ts';

type Popup<T> = {open: boolean, type: T};

type context = {
  login: boolean
  setLogin: (p:boolean) => void;
  tec: {
    setPopUpTec: (p: Popup<TecnologiaType>) => void;
    popupTec: Popup<TecnologiaType>
  }
  proj: {
    setPopUpProj: (p: Popup<ProjetosType>) => void;
    popupProj: Popup<ProjetosType>
  }
}

const Context = createContext({} as context);

export default Context;
