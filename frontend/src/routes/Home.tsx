import { useEffect, useState } from 'react';
import { ProjetosType } from '../types.ts';
import DatabaseFetch from '../service/DatabaseFetch.ts';
import Popup from '../Components/Popup.tsx';

function Home() {
  const [projetos, setProjetos] = useState<ProjetosType[]>([]);
  const db = new DatabaseFetch();
  const [popup, setPopup] = useState({ open: false, projeto: {} as ProjetosType });

  useEffect(() => {
    db.getProjects().then((e) => setProjetos(e));
  }, []);

  const handleClick = (projeto: ProjetosType) => {
    setPopup({ open: !popup.open, projeto });
  };

  return (
    <div className="w-screen h-screen">
      {popup.open && (
        <Popup popup={ popup } setPopup={ setPopup } />
      )}

      <section className="flex flex-col gap-3 p-5">
        {projetos.length > 0 ? projetos.map((proj) => (
          <button
            onClick={ () => handleClick(proj) }
            key={ proj.title }
          >
            <h2>{proj.title}</h2>
          </button>
        )) : <div>Loading</div>}
      </section>
    </div>
  );
}

export default Home;
