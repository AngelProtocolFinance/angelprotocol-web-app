import { UseFormRegisterReturn } from "react-hook-form";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  errorMessage?: string;
  registerReturn: UseFormRegisterReturn;
};

export default function Input(props: Props) {
  const { label, errorMessage, registerReturn, required, ...rest } = props;
  const { type = "text" } = rest;

  return (
    <div className="items-center justify-center mb-4">
      <div className="text-left">
        <label htmlFor={registerReturn.name}>
          {label}
          {required && <span className="ml-0.5 text-failed-red">*</span>}
        </label>
      </div>
      <div className="mr-5 rounded-md bg-white flex items-center text-black py-2">
        <input
          id={registerReturn.name}
          type={type}
          className="outline-none border-none w-full px-3"
          {...rest}
          {...registerReturn}
        />
      </div>
      {errorMessage && (
        <p className="text-sm text-failed-red">{errorMessage}</p>
      )}
    </div>
  );
}
