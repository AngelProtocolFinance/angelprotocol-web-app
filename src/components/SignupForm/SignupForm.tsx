import Icon from "components/Icon";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function SignupForm() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form className="">
        <div className="grid grid-cols-[auto_1fr_auto] border border-prim rounded">
          <Icon type="Padlock" />
          <input type={isPasswordShown ? "text" : "password"} />
          <button
            type="button"
            onClick={() => setIsPasswordShown((prev) => !prev)}
          >
            <Icon type={isPasswordShown ? "EyeSlashed" : "Eye"} />
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
