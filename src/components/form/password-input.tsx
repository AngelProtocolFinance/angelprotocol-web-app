import { Eye, EyeOff, Lock } from "lucide-react";
import { type InputHTMLAttributes, forwardRef, useState } from "react";

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
      <div className="relative">
        <Lock
          className="text-gray absolute top-1/2 -translate-y-1/2 left-4"
          size={20}
        />
        <input
          ref={ref}
          {...rest}
          type={isPasswordShown ? "text" : "password"}
          autoComplete="current-password"
          className="w-full h-full field-input pl-12"
          aria-invalid={!!error}
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray hover:text-gray active:text-gray-d1 rounded-sm "
          onClick={() => setIsPasswordShown((prev) => !prev)}
        >
          {isPasswordShown ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && <p className="text-xs text-red mt-1.5">{error}</p>}
    </div>
  );
});
