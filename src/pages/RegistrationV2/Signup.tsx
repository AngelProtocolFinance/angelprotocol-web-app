import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { TextInput } from "components/TextInput";

type FormValues = { email: string };

export default function Signup() {
  const methods = useForm<FormValues>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().required("required").email("invalid email"),
      })
    ),
  });

  const { handleSubmit } = methods;

  function onSubmit({ email }: FormValues) {
    alert(email);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="padded-container w-full max-w-[37.5rem] mt-20 grid"
    >
      <h3 className="text-3xl font-bold text-center">
        Register to Angel Protocol
      </h3>
      <FormProvider {...methods}>
        <TextInput
          name="email"
          label="E-mail"
          placeholder="e.g. johndoe@example.com"
          classes={{ container: "mt-14" }}
        />
      </FormProvider>
      <button className="btn-orange p-3 mt-8">submit</button>
    </form>
  );
}
