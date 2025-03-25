import type { Classes } from "components/form/types";
import { unpack } from "helpers/unpack";
import type { Church } from "lucide-react";
import { type InputHTMLAttributes, forwardRef } from "react";

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
      <div className="relative">
        {props.icon && (
          <props.icon
            className="text-gray absolute top-1/2 -translate-y-1/2 left-4"
            size={20}
          />
        )}
        <input
          {...rest}
          ref={ref}
          type="text"
          className={`field-input h-full ${props.icon ? "pl-12" : ""} ${style.input}`}
          aria-invalid={!!error}
        />
      </div>
      {error && <p className={`text-xs text-red mt-1.5 ${error}`}>{error}</p>}
    </div>
  );
});
