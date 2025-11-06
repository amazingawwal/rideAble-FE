import type { Mat_Symbol } from "../assets/types";

export default function Icon({ children }: Mat_Symbol) {
  return (
    <span className="material-symbols-outlined text-[10px] text-black-600">
      {children}
    </span>
  );
}
