import Icon from "components/Icon";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import { fieldClasses } from "./constants";

export default function PasswordField() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div>
      <div className={`grid grid-cols-[auto_1fr_auto] px-5 ${fieldClasses}`}>
        <Icon type="Padlock" className="text-navy-l3" size={20} />
        <input
          {...register("password")}
          type={isPasswordShown ? "text" : "password"}
          className="w-full h-full placeholder:font-medium focus:outline-none bg-transparent py-4"
          placeholder="Create password"
          aria-invalid={!!errors.password?.message}
        />
        <button
          type="button"
          className="text-navy-l3 focus:text-navy-d4 hover:text-[#1D3C51] rounded focus:outline focus:outline-2 focus:outline-blue-d1"
          onClick={() => setIsPasswordShown((prev) => !prev)}
        >
          <Icon type={isPasswordShown ? "EyeSlashed" : "Eye"} size={20} />
        </button>
      </div>
      {errors.password?.message && (
        <p className="text-xs text-[#C52828] mt-1.5">
          {errors.password.message}
        </p>
      )}
    </div>
  );
}
