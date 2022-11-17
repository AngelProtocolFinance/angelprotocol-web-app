import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { SchemaShape } from "schemas/types";
import { useNewApplicationMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import Checkbox from "components/Checkbox";
import { TextInput, checkBoxStyle } from "components/registration";
import { BtnPrim, BtnSec, OrSeparator } from "components/registration";
import { handleMutationResult } from "helpers";
import { PRIVACY_POLICY } from "constants/urls";
import { routes } from "./routes";

type FormValues = { email: string; hasAgreedToPrivacyPolicy: boolean };

export default function Signup({ classes = "" }: { classes?: string }) {
  const [register] = useNewApplicationMutation();
  const methods = useForm<FormValues>({
    resolver: yupResolver(
      Yup.object().shape<SchemaShape<FormValues>>({
        email: Yup.string().required("required").email("invalid email"),
        hasAgreedToPrivacyPolicy: Yup.boolean().oneOf(
          [true],
          "must agree to privacy policy"
        ),
      })
    ),
  });
  const { handleError } = useErrorContext();
  const { handleSubmit } = methods;

  async function onSubmit({ email }: FormValues) {
    handleMutationResult(await register({ email }), handleError);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${classes} padded-container w-full max-w-[37.5rem] my-20 grid`}
    >
      <h3 className="text-3xl font-bold text-center">
        Register to Angel Protocol
      </h3>
      <FormProvider {...methods}>
        <TextInput<FormValues>
          name="email"
          label="E-mail"
          placeholder="e.g. johndoe@example.com"
          classes={{ container: "mt-8 mx-0 sm:mx-24" }}
        />
        <Checkbox<FormValues>
          required
          name="hasAgreedToPrivacyPolicy"
          classes={{
            container: "justify-self-center mt-6 mb-8 text-xs",
            checkbox: checkBoxStyle,
            error: "mt-2",
          }}
        >
          I declare that I have read and agreed to{" "}
          <a
            className="underline text-orange"
            target="_blank"
            href={PRIVACY_POLICY}
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </Checkbox>
      </FormProvider>
      <BtnPrim type="submit" className="mt-8 mx-0 sm:mx-24">
        Register
      </BtnPrim>
      <OrSeparator classes="my-11" />
      <BtnSec as="link" className="mx-0 sm:mx-24" to={routes.resume}>
        Resume your registration
      </BtnSec>
    </form>
  );
}
