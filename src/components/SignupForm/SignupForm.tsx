import { FormProvider, useForm } from "react-hook-form";

export default function SignupForm() {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form>
        <div>
          <input />
        </div>
      </form>
    </FormProvider>
  );
}
