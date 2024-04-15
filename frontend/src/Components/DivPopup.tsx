function DivPopup({ children, w, h }:
   {children: React.ReactNode, w: number, h:number}) {
  return (
    <div
      className={ `
      fixed left-[10%] top-[10%] w-[${w}%] h-[${h}%]
    bg-slate-300 flex flex-col justify-evenly gap-5 p-2
    rounded-md
    ` }
    >
      {children}
    </div>
  );
}

export default DivPopup;
