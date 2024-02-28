import { yupResolver } from "@hookform/resolvers/yup";
import { AuthError, signUp } from "aws-amplify/auth";
import Icon from "components/Icon";
import { Form } from "components/form";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { useErrorContext } from "contexts/ErrorContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { requiredString } from "schemas/string";
import { object } from "yup";

export default function SignupForm() {
  const { handleError } = useErrorContext();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(
      object({
        password: requiredString
          .min(8, ({ min }) => `must have at least ${min} characters`)
          .matches(/[a-z]/, "must have lowercase letters")
          .matches(/[A-Z]/, "must have uppercase letters")
          .matches(/\d/, "must have numbers")
          .matches(
            /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/,
            "must have special characters"
          ),
      })
    ),
  });

  return (
    <Form
      disabled={isSubmitting}
      onSubmit={handleSubmit(async (fv) => {
        console.log({ fv });
        try {
          await signUp({
            username: "justin@better.giving",
            password: fv.password,
            options: {
              userAttributes: {
                family_name: "testfamily",
                given_name: "testgiven",
              },
            },
          });
        } catch (err) {
          const message =
            err instanceof AuthError ? err.message : GENERIC_ERROR_MESSAGE;
          handleError(message);
        }
      })}
      className="grid w-96 mt-4"
    >
      <div className='grid grid-cols-[auto_1fr_auto] border border-prim rounded items-center px-3 has-[:focus]:ring-2 ring-blue ring-offset-1  has-[input[aria-invalid="true"]]:border-red has-[:disabled]:bg-gray-l3'>
        <Icon type="Padlock" className="mr-3 text-gray" />
        <input
          {...register("password")}
          type={isPasswordShown ? "text" : "password"}
          className="h-full focus:outline-none bg-transparent"
          placeholder="Create password"
          aria-invalid={!!errors.password?.message}
        />

        <button
          type="button"
          className="py-3 focus:outline-none focus:text-black text-gray"
          onClick={() => setIsPasswordShown((prev) => !prev)}
        >
          <Icon type={isPasswordShown ? "EyeSlashed" : "Eye"} />
        </button>
      </div>
      <p className="text-xs text-red text-right empty:mb-4 mt-1">
        {errors.password?.message}
      </p>

      <button
        type="submit"
        className="btn-blue rounded-full text-lg normal-case px-4 w-full mt-4"
      >
        {isSubmitting ? "Submitting..." : "Create account"}
      </button>
    </Form>
  );
}
