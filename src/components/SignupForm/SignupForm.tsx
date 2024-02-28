import Icon from "components/Icon";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function SignupForm() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form className="grid w-96 gap-4 mt-4">
        <div className="grid grid-cols-[auto_1fr_auto] border border-prim rounded items-center px-3 has-[:focus]:ring-2 ring-blue-d1">
          <Icon type="Padlock" className="mr-3 text-gray" />
          <input
            type={isPasswordShown ? "text" : "password"}
            className="h-full focus:outline-none"
            placeholder="Create password"
          />
          <button
            type="button"
            className="py-3"
            onClick={() => setIsPasswordShown((prev) => !prev)}
          >
            <Icon
              type={isPasswordShown ? "EyeSlashed" : "Eye"}
              className="text-gray"
            />
          </button>
        </div>
        <button className="btn-blue rounded-full text-lg normal-case px-4 w-full">
          Create account
        </button>
      </form>
    </FormProvider>
  );
}
