import { ChangeEvent, ChangeEventHandler, useCallback, useState } from "react";
import Button from "./Button";

type Props = { onClick: (value: string) => void };

export default function ContinueWithEmail({ onClick }: Props) {
  const [value, setValue] = useState("");

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    []
  );
  const handleClick = useCallback(() => onClick(value), [onClick, value]);

  return (
    <div className="flex flex-col gap-3">
      <InputEmail value={value} onChange={handleChange} />
      <Button
        className="bg-opacity-40 hover:bg-opacity-50"
        onClick={handleClick}
      >
        Continue with Email
      </Button>
    </div>
  );
}

type InputEmailProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

function InputEmail({ value, onChange }: InputEmailProps) {
  return (
    <input
      type="string"
      className="flex h-12 w-full justify-center rounded-sm pl-4 outline-none bg-white text-angel-grey text-sm"
      placeholder="Enter your email"
      value={value}
      onChange={onChange}
    />
  );
}
