function DivPopup({ children }:
   {children: React.ReactNode}) {
  return (
    <div
      className={ `
      fixed left-[10%] top-[10%] w-[80%] h-[80%]
    bg-slate-300 flex flex-col justify-evenly gap-5 p-2
    rounded-md overflow-auto
    ` }
    >
      {children}
    </div>
  );
}

export default DivPopup;
