const variantClasses = {
  primary: "bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-500",
  secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-300",
  outline:
    "border border-sky-500 text-sky-500 hover:bg-sky-50 focus:ring-sky-500",
  logo: "bg-transparent text-sky-600 hover:text-sky-700 font-bold text-xl shadow-none focus:ring-0",
};

const sizes = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2.5",
  lg: "text-lg px-6 py-3",
  // logo: "w-12 h-12 p-0 rounded-full",
  logo: "text-2xl font-bold px-2 py-1",
};

type Variant = keyof typeof variantClasses;
type Sizes = keyof typeof sizes;

export type ButtonType = {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  size?: Sizes;
  loading?: boolean;
};

export default function Button({
  children,
  loading,
  size,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
}: ButtonType) {
  const baseStyles =
    "w-full py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition shadow-md";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantClasses[variant]} ${sizes[size!]} ${loading} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}
