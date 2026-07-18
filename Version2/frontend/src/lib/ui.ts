export const interact =
  "transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out";

export const pressable = `${interact} cursor-pointer active:scale-[0.98] active:duration-75`;

export const btnPrimary =
  `${pressable} border-2 border-slate-900 bg-slate-900 text-sm font-bold text-white hover:bg-slate-700`;

export const btnSecondary =
  `${pressable} border-2 border-slate-300 text-sm font-bold hover:border-slate-900 hover:bg-slate-50`;

export const cardHover = `${interact} hover:border-slate-900 hover:shadow-[3px_3px_0_0_#cbd5e1]`;

export const rowHover = `${interact} hover:bg-slate-50`;
