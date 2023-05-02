import { FormProvider, useForm } from "react-hook-form";
import { FV, FormValues } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import Form from "./Form";

export default function Whitelists() {
  const { whitelistedBeneficiaries, whitelistedContributors } =
    useAdminResources<"charity">();
  const flatInitial: FV = {
    contributors: whitelistedContributors,
    beneficiaries: whitelistedBeneficiaries,
  };

  const defaults: FormValues = {
    ...flatInitial,
    initial: flatInitial,
  };

  const methods = useForm<FormValues>({
    defaultValues: defaults,
  });

  return (
    <>
      <h2 className="text-[2rem] font-bold mb-10">Whitelists</h2>
      <FormProvider {...methods}>
        <Form />
      </FormProvider>
    </>
  );
}
