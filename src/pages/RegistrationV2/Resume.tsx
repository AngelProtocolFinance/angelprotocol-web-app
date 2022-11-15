import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { SchemaShape } from "schemas/types";
import { TextInput } from "components/registration";
import { BtnPrim, BtnSec } from "components/registration";
import OrSeparator from "components/registration/OrSeparator";

type FormValues = { reference: string };

export default function Resume({ classes = "" }: { classes?: string }) {
  const methods = useForm<FormValues>({
    resolver: yupResolver(
      Yup.object().shape<SchemaShape<FormValues>>({
        reference: Yup.string().required("required"),
      })
    ),
  });

  const { handleSubmit } = methods;

  function onSubmit({ reference }: FormValues) {
    alert(reference);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${classes} padded-container w-full max-w-[37.5rem] my-20 grid`}
    >
      <h3 className="text-3xl font-bold text-center">Resume registration</h3>
      <p className="text-center mt-2 text-gray-d1 dark:text-gray-l2 text-lg">
        Enter your registration reference to resume where you left off
      </p>
      <FormProvider {...methods}>
        <TextInput<FormValues>
          name="reference"
          label="Registration reference"
          placeholder="e.g. 00000000-0000-0000-0000-000000000000"
          classes={{ container: "mt-8 mx-0 sm:mx-24" }}
        />
      </FormProvider>
      <BtnPrim type="submit" className="mt-8 mx-0 sm:mx-24">
        Resume
      </BtnPrim>
      <OrSeparator classes="my-11" />
      <BtnSec as="link" className="mx-0 sm:mx-24" to="..">
        Register new account
      </BtnSec>
    </form>
  );
}
