const variantClasses = {
  primary: "bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-500",
  secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-300",
  outline:
    "border border-sky-500 text-sky-500 hover:bg-sky-50 focus:ring-sky-500",
};

type Variant = keyof typeof variantClasses;

export type ButtonType = {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  size?: string;
};

export default function Button({
  children,
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
      className={`${baseStyles} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}
