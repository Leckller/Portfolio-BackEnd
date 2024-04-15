import { createContext } from 'react';

type context = {
  login: boolean
  setLogin: (p:boolean) => void;
}

const Context = createContext({} as context);

export default Context;
