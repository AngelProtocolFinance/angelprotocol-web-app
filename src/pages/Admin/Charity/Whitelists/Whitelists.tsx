import { FormProvider, useForm } from "react-hook-form";
import { FormValues as FV, WhiteLists } from "./types";
import { useAdminResources } from "../../Guard";
import Form from "./Form";

export default function Whitelists() {
  const { whitelistedBeneficiaries, whitelistedContributors } =
    useAdminResources<"charity">();

  const initial: WhiteLists = {
    contributors: whitelistedContributors,
    beneficiaries: whitelistedBeneficiaries,
  };

  const methods = useForm<FV>({
    defaultValues: {
      ...initial,
      initial,
    },
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
