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
      className="flex text-grey-accent w-full rounded-md pl-2 items-center bg-white h-full"
      type="text"
      name="amount"
    />
  );
}
