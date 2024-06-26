import { ProjFields, ProjetosFieldsBool, ProjetosType } from '../types.ts';

function Editable({ text, field, setEdit, edit, fields, handleFields }: {
  field: ProjFields,
   // eslint-disable-next-line no-unused-vars
   setEdit: (p: ProjetosType) => void,
  edit: ProjetosType, fields: ProjetosFieldsBool,
  // eslint-disable-next-line no-unused-vars
  handleFields: (f: ProjFields) => void,
  text: string
}) {
  return (
    <div className="flex flex-col gap-2 flex-wrap items-center text-center">
      {fields[field] ? (
        <textarea
          data-testid="textarea"
          className="w-full h-[100px]"
          value={ edit[field] }
          onChange={ ({ target: { value } }) => setEdit({ ...edit, [field]: value }) }
        />
      ) : (
        <h2>{text}</h2>
      )}
      <button
        className={ `${fields[field] ? 'bg-blue-400' : 'bg-white'}
        max-w-[300px] w-full h-[50px] rounded-md text-lg font-bold` }
        data-testid="button"
        onClick={ () => handleFields(field) }
      >
        {fields[field] ? 'Salvar' : 'Editar'}
      </button>
    </div>
  );
}

export default Editable;
