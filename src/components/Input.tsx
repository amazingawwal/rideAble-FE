export type InputType = {
  label?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  name?: string;
  error?: string;
};

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  name,
  error = "",
}: InputType) {
  const inputId = name || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full border rounded-lg px-3 py-2 mt-1 focus:ring-sky-500 focus:border-sky-500 ${
          error ? "border-red-500" : "border"
        }`}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
