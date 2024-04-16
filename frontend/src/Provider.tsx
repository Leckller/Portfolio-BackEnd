import React, { useState } from 'react';
import Context from './Context.tsx';
import { ProjetosType, TecnologiaType } from './types.ts';

function Provider({ children }: {children: React.ReactNode}) {
  const [login, setLogin] = useState(false);
  const [popupTec, setPopupTec] = useState({ open: false, type: {} as TecnologiaType });
  const [popupProj, setPopupProj] = useState({ open: false, type: {} as ProjetosType });

  return (
    <Context.Provider
      value={ {
        login,
        setLogin,
        proj: { popupProj, setPopupProj },
        tec: { popupTec, setPopupTec },
      } }
    >
      {children}
    </Context.Provider>

  );
}

export default Provider;
