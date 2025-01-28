import { Eye, EyeOff, Lock } from "lucide-react";
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
        <Lock className="text-gray" size={20} />
        <input
          ref={ref}
          {...rest}
          type={isPasswordShown ? "text" : "password"}
          autoComplete="current-password"
          className="w-full h-full placeholder:font-medium placeholder:font-heading placeholder:text-gray max-sm:placeholder:text-sm focus:outline-hidden bg-transparent"
          aria-invalid={!!error}
        />
        <button
          type="button"
          className="text-gray hover:text-gray active:text-gray-d1 rounded-sm focus-visible:outline focus-visible:outline-2"
          onClick={() => setIsPasswordShown((prev) => !prev)}
        >
          {isPasswordShown ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && <p className="text-xs text-red mt-1.5">{error}</p>}
    </div>
  );
});
