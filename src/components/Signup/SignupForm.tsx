import { yupResolver } from "@hookform/resolvers/yup";
import { AuthError, signUp } from "aws-amplify/auth";
import Icon from "components/Icon";
import { Form } from "components/form";
import { useErrorContext } from "contexts/ErrorContext";
import { logger } from "helpers";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { requiredString } from "schemas/string";
import { useSaveSignupMutation } from "services/aws/hubspot";
import { object } from "yup";
import type { Donor, StateSetter } from "./types";

type Props = {
  donor: Donor;
  setSignupState: StateSetter;
  classes?: string;
};

export default function SignupForm(props: Props) {
  const [savetoHubspot] = useSaveSignupMutation();
  const { handleError, displayError } = useErrorContext();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(
      object({
        //rules from https://github.com/aws-amplify/amplify-ui/blob/main/packages/ui/src/machines/authenticator/defaultServices.ts
        password: requiredString
          .min(8, ({ min }) => `must have at least ${min} characters`)
          .matches(/[a-z]/, "must have lowercase letters")
          .matches(/[A-Z]/, "must have uppercase letters")
          .matches(/[0-9]/, "must have numbers")
          .test("_", "must have special characters", (pw) =>
            //prettier-ignore
            //biome-ignore format:
            [
            '^', '$', '*', '.', '[', ']',
            '{', '}', '(', ')', '?', '"',
            '!', '@', '#', '%', '&', '/',
            '\\', ',', '>', '<', "'", ':',
            ';', '|', '_', '~', '`', '=',
            '+', '-', ' '
        ].some((c) => pw.includes(c))
          ),
      })
    ),
  });

  return (
    <Form
      className={`${props.classes ?? ""} grid`}
      disabled={isSubmitting}
      onSubmit={handleSubmit(async (fv) => {
        try {
          try {
            await savetoHubspot({
              email: props.donor.email,
              firstName: props.donor.firstName,
              lastName: props.donor.lastName,
              type: "donor",
            }).unwrap();
          } catch (err) {
            logger.error(err);
          }

          const { nextStep } = await signUp({
            username: props.donor.email,
            password: fv.password,
            options: {
              userAttributes: {
                given_name: props.donor.firstName,
                family_name: props.donor.lastName,
              },
              autoSignIn: false,
            },
          });

          //per cognito config
          if (nextStep.signUpStep !== "CONFIRM_SIGN_UP")
            throw "Auth config error: next step after signup should be confirm signup";
          if (nextStep.codeDeliveryDetails.deliveryMedium !== "EMAIL")
            throw "Auth config error: code confirmation must be sent to email";
          if (!nextStep.codeDeliveryDetails.destination)
            throw "Auth error: code delivery details was not included";

          props.setSignupState({
            codeRecipientEmail: {
              raw: props.donor.email,
              obscured: nextStep.codeDeliveryDetails.destination,
            },
          });
        } catch (err) {
          if (err instanceof AuthError) {
            return displayError(err.message);
          }
          handleError(err, { context: "signing up" });
        }
      })}
    >
      <div className='grid grid-cols-[auto_1fr_auto] h-[3.25rem] bg-gray-l5 px-5 border border-gray-l4 rounded items-center has-[:focus]:ring-2 ring-blue-d1 ring-offset-1  has-[input[aria-invalid="true"]]:border-red has-[:disabled]:bg-gray-l3'>
        <Icon type="Padlock" className="mr-3 text-gray" size={20} />
        <input
          {...register("password")}
          type={isPasswordShown ? "text" : "password"}
          className="h-full focus:outline-none bg-transparent font-heading placeholder:text-navy-l3 font-medium"
          placeholder="Create password"
          aria-invalid={!!errors.password?.message}
        />

        <button
          type="button"
          className="py-3 focus:outline-none focus:text-black text-gray"
          onClick={() => setIsPasswordShown((prev) => !prev)}
        >
          <Icon type={isPasswordShown ? "EyeSlashed" : "Eye"} size={18.5} />
        </button>
      </div>
      <p className="text-xs text-red text-right mt-1">
        {errors.password?.message}
      </p>

      <button
        type="submit"
        className="btn-blue rounded-full normal-case w-full mt-4 h-[3.25rem] font-heading"
      >
        {isSubmitting ? "Submitting..." : "Create account"}
      </button>
    </Form>
  );
}
