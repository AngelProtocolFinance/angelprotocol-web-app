import { InputHTMLAttributes } from "react";

export default function Checkbox(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input type="checkbox" className="checkbox-orange" {...props} />;
}
