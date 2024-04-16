import React, { useState } from 'react';
import Context from './Context.tsx';
import { ProjetosType, TecnologiaType } from './types.ts';

function Provider({ children }: {children: React.ReactNode}) {
  const [login, setLogin] = useState(false);
  const [popupTec, setPopupTec] = useState({ open: false, type: {} as TecnologiaType });
  const [popupProj, setPopupProj] = useState({ open: false, type: {} as ProjetosType });
  const [data, setData] = useState({ projs: [] as ProjetosType[],
    tecs: [] as TecnologiaType[] });

  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={ {
        login,
        setLogin,
        proj: { popupProj, setPopupProj },
        tec: { popupTec, setPopupTec },
        data,
        setData,
      } }
    >
      {children}
    </Context.Provider>

  );
}

export default Provider;
