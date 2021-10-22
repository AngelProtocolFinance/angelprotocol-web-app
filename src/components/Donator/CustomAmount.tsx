import { Field, useFormikContext } from "formik";
import { useEffect, useRef } from "react";
import { Values } from "components/Donator/types";

export default function CustomAmount() {
  const { setFieldValue } = useFormikContext<Values>();
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    setFieldValue("amount", "");
    inputRef.current?.focus();
    //eslint-disable-next-line
  }, []);

  return (
    <Field
      innerRef={inputRef}
      className="border-transparent outline-none text-black w-52 rounded-md pl-2 py-2"
      type="text"
      name="amount"
    />
  );
}
