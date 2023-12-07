import { InputHTMLAttributes, useState } from "react";

type IProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange" | "autoComplete" | "spellCheck" | "inputMode" | "value"
> & {
  onChange: (expectedFunds: number) => void;
};

export default function NumberInput({ className, onChange, ...rest }: IProps) {
  const [value, setValue] = useState("");

  return (
    <input
      type="text"
      value={value}
      onChange={(event) => {
        const tvalue = Number(event.target.value);
        if (isNaN(tvalue)) {
          return event.preventDefault();
        }
        setValue(event.target.value);
        onChange(tvalue);
      }}
      autoComplete="off"
      spellCheck={false}
      inputMode="numeric"
      className={`text-field ${className}`}
      {...rest}
    />
  );
}
