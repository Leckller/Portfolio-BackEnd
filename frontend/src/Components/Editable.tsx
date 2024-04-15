import { ProjFields, ProjetosFieldsBool, ProjetosType } from '../types.ts';

function Editable({ text, field, setEdit, edit, fields, handleFields }: {
  field: ProjFields,
   setEdit: (p: ProjetosType) => void,
  edit: ProjetosType, fields: ProjetosFieldsBool,
  handleFields: (field: ProjFields) => void,
  text: string
}) {
  return (
    <div className="flex flex-col gap-2 flex-wrap items-center text-center">
      {fields[field] ? (
        <textarea
          className="w-full h-[100px]"
          value={ edit[field] }
          onChange={ ({ target: { value } }) => setEdit({ ...edit, [field]: value }) }
        />
      ) : (
        <h2>{text}</h2>
      )}
      <button
        className={ `${fields[field] ? 'bg-blue-400' : 'bg-green-400'}
        w-[300px] h-[20px]` }
        onClick={ () => handleFields(field) }
      >
        ----E----
      </button>
    </div>
  );
}

export default Editable;
