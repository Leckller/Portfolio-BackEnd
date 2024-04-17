import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DatabaseFetch from '../service/DatabaseFetch.ts';
import TecFetch from '../service/TecFetch.ts';
import Context from '../Context.tsx';
import AddItem from '../Components/AddItem.tsx';
import Tecnologies from '../Components/Tecnologies.tsx';
import Projetos from '../Components/Projetos.tsx';

function Home() {
  const { tec, proj, data, setData } = useContext(Context);
  const projDB = new DatabaseFetch();
  const tecDB = new TecFetch();
  const path = useLocation().pathname;

  useEffect(() => {
    if (data.projs.length === 0 && path === '/home') {
      projDB.getItems().then((req) => setData({ ...data, projs: req }));
    }
    if (data.tecs.length === 0 && path === '/tec') {
      tecDB.getItems().then((req) => setData({ ...data, tecs: req }));
    }
  }, [path]);

  return (
    <div className="w-screen h-screen">

      {tec.popupTec.open && (<AddItem db={ tecDB } />)}
      {proj.popupProj.open && (<AddItem db={ projDB } />)}

      {
        path === '/home' ? (
          <Projetos />
        ) : (
          <Tecnologies />
        )
      }
    </div>
  );
}

export default Home;
