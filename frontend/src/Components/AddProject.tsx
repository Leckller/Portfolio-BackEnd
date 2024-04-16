import DatabaseFetch from '../service/DatabaseFetch.ts';
import { ProjFields, ProjetosType } from '../types.ts';
import DivPopup from './DivPopup.tsx';

type State = {
  open: boolean,
  newProject: ProjetosType
}

function AddProject({ setNewProj, newProj }
  // eslint-disable-next-line no-unused-vars
  : {setNewProj: (p:State) => void, newProj: State}) {
  const db = new DatabaseFetch();
  const handleAddProject = (field: ProjFields, value: string) => {
    setNewProj({ ...newProj,
      newProject: {
        ...newProj.newProject,
        [field]: value,
      } });
  };
  return (
    <DivPopup>
      <button
        className="w-full text-end"
        onClick={ () => setNewProj({ open: false,
          newProject: {} as ProjetosType }) }
      >
        X
      </button>
      <div className="flex flex-col gap-5 items-start">
        <label className="flex flex-col w-full ">
          Title
          <input
            data-testid="new-project-button"
            onChange={ ({ target: { value } }) => {
              handleAddProject('title', value);
            } }
            type="text"
          />
        </label>

        <label className="flex flex-col w-full ">
          Descrição
          <textarea
            data-testid="new-project-button"
            className="resize-none w-full"
            onChange={ ({ target: { value } }) => {
              handleAddProject('describe', value);
            } }

          />
        </label>

        <label className="flex flex-col w-full ">
          Tecnologias
          <input
            data-testid="new-project-button"
            onChange={ ({ target: { value } }) => {
              handleAddProject('tecnologias', value);
            } }
            type="text"
            placeholder="Escreva com separação por virgula"
          />
        </label>

        <label className="flex flex-col w-full ">
          Url
          <input
            data-testid="new-project-button"
            onChange={ ({ target: { value } }) => {
              handleAddProject('url', value);
            } }
            type="text"
          />
        </label>

        <label className="flex flex-col w-full ">
          gitHub
          <input
            data-testid="new-project-button"
            onChange={ ({ target: { value } }) => {
              handleAddProject('gitHub', value);
            } }
            type="text"
          />
        </label>
      </div>

      <button
        data-testid="add-project-button"
        onClick={ () => {
          db.addProject(newProj.newProject);
          setNewProj({ open: false,
            newProject: {} as ProjetosType });
        } }
      >
        Adicionar
      </button>
    </DivPopup>
  );
}

export default AddProject;
