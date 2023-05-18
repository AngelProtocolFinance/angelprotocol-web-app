import { FormProvider, useForm } from "react-hook-form";
import { FormValues as FV, WhiteLists } from "./types";
import { EndowmentSettingsUpdate } from "types/contracts";
import { useAdminResources } from "../../Guard";
import Form from "./Form";

export default function Whitelists() {
  const {
    whitelistedBeneficiaries,
    whitelistedContributors,
    id,
    donationMatchActive,
    splitToLiquid,
    ignoreUserSplits,
  } = useAdminResources<"charity">();

  const initial: EndowmentSettingsUpdate = {
    id,
    donationMatchActive,
    whitelistedBeneficiaries,
    whitelistedContributors,
    maturity_whitelist_add: [], //not included in form
    maturity_whitelist_remove: [], //not included in form
    splitToLiquid,
    ignoreUserSplits,
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
