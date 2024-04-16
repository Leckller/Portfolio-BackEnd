import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProjetosType } from '../types.ts';
import DatabaseFetch from '../service/DatabaseFetch.ts';
import Popup from '../Components/Popup.tsx';
import DeleteProject from '../Components/DeleteProject.tsx';
import TecFetch from '../service/TecFetch.ts';
import Context from '../Context.tsx';
import AddItem from '../Components/AddItem.tsx';
import Tecnologies from '../Components/Tecnologies.tsx';

function Home() {
  const [popup, setPopup] = useState({ open: false, projeto: {} as ProjetosType });
  const { tec, proj, data, setData } = useContext(Context);
  const projDB = new DatabaseFetch();
  const tecDB = new TecFetch();
  const path = useLocation().pathname;

  useEffect(() => {
    if (data.projs.length === 0) {
      projDB.getItems().then((req) => setData({ ...data, projs: req }));
    }
    if (data.tecs.length === 0 && path === '/tec') {
      tecDB.getItems().then((req) => setData({ ...data, tecs: req }));
    }
  }, []);

  const handleClick = (projeto: ProjetosType) => {
    setPopup({ open: !popup.open, projeto });
  };

  return (
    <div className="w-screen h-screen">
      {popup.open && (<Popup popup={ popup } setPopup={ setPopup } />)}

      {tec.popupTec.open && (<AddItem db={ tecDB } />)}
      {proj.popupProj.open && (<AddItem db={ projDB } />)}

      {
        path === '/home' ? (
          <main className="flex flex-col items-center gap-3 p-5">
            {data.projs.length > 0 ? data.projs.map((p) => (
              <div
                key={ p.title }
                className="flex flex-row gap-5 w-[300px] text-left"
              >
                <button
                  data-testid="project"
                  className="text-2xl font-bold border-2 rounded-md border-black p-1"
                  onClick={ () => handleClick(p) }
                >
                  <h2>{p.title}</h2>
                </button>
                <DeleteProject DB={ projDB } title={ p.title } />
              </div>
            )) : <div>Loading</div>}
          </main>
        ) : (
          <Tecnologies />
        )
      }
    </div>
  );
}

export default Home;
