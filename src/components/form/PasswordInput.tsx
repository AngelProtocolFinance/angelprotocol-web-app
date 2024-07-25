import Icon from "components/Icon";
import { type InputHTMLAttributes, forwardRef, useState } from "react";
import { fieldClasses } from "./constants";

type El = HTMLInputElement;
interface Props
  extends Omit<InputHTMLAttributes<El>, "className" | "type" | "autoComplete"> {
  error?: string;
}

export const PasswordInput = forwardRef<El, Props>((props, ref) => {
  const { error, ...rest } = props;
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div>
      <div className={`grid grid-cols-[auto_1fr_auto] px-5 ${fieldClasses}`}>
        <Icon type="Padlock" className="text-navy-l3" size={20} />
        <input
          ref={ref}
          {...rest}
          type={isPasswordShown ? "text" : "password"}
          autoComplete="current-password"
          className="w-full h-full placeholder:font-medium placeholder:font-heading placeholder:text-navy-l3 max-sm:placeholder:text-sm focus:outline-none bg-transparent"
          aria-invalid={!!error}
        />
        <button
          type="button"
          className="text-navy-l3 hover:text-navy-l2 active:text-navy rounded focus-visible:outline focus-visible:outline-2"
          onClick={() => setIsPasswordShown((prev) => !prev)}
        >
          <Icon type={isPasswordShown ? "EyeSlashed" : "Eye"} size={20} />
        </button>
      </div>
      {error && <p className="text-xs text-red mt-1.5">{error}</p>}
    </div>
  );
});
