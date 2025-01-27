import type { Classes } from "components/form/types";
import { unpack } from "helpers";
import type { Church } from "lucide-react";
import { type InputHTMLAttributes, forwardRef } from "react";

import { fieldClasses } from "./constants";

type El = HTMLInputElement;
interface Props extends Omit<InputHTMLAttributes<El>, "type" | "className"> {
  classes?: Classes;
  error?: string;
  icon?: typeof Church;
}

export const Input = forwardRef<El, Props>((props, ref) => {
  const { classes, error, icon, ...rest } = props;
  const style = unpack(classes);

  return (
    <div className={style.container}>
      <div
        className={`grid ${
          props.icon ? "grid-cols-[auto_1fr]" : ""
        } ${fieldClasses}`}
      >
        {props.icon && <props.icon className="ml-5 text-navy-l3" size={20} />}
        <input
          {...rest}
          ref={ref}
          type="text"
          className={`w-full h-full placeholder:font-medium placeholder:font-heading placeholder:text-navy-l3 max-sm:placeholder:text-sm focus:outline-hidden bg-transparent ${
            props.icon ? "pr-5" : "px-5"
          } ${style.input}`}
          aria-invalid={!!error}
        />
      </div>
      {error && (
        <p className={`text-xs text-red-d3 mt-1.5 ${error}`}>{error}</p>
      )}
    </div>
  );
});
