import { FormProvider, useForm } from "react-hook-form";
import { FormValues as FV } from "./types";
import { EndowmentSettingsUpdate } from "types/contracts";
import { useAdminContext } from "../../Context";
import Form from "./Form";

export default function Whitelists() {
  const {
    allowlistedBeneficiaries,
    allowlistedContributors,
    id,
    donationMatchActive,
    splitToLiquid,
    ignoreUserSplits,
    maturityTime,
  } = useAdminContext<"charity">();

  const initial: EndowmentSettingsUpdate = {
    id,
    donationMatchActive,
    maturityTime,
    allowlistedBeneficiaries,
    allowlistedContributors,
    maturity_allowlist_add: [], //not included in form
    maturity_allowlist_remove: [], //not included in form
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
