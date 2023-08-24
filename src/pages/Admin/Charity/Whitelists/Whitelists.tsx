import { FormProvider, useForm } from "react-hook-form";
import { FormValues as FV } from "./types";
import { EndowmentSettingsUpdate } from "types/contracts";
import { useAdminContext } from "../../Context";
import Form from "./Form";
import { ops } from "./constants";

export default function Whitelists() {
  const {
    allowlistedBeneficiaries,
    allowlistedContributors,
    id,
    donationMatchActive,
    splitToLiquid,
    ignoreUserSplits,
    maturityTime,
  } = useAdminContext<"charity">(ops);

  const initial: EndowmentSettingsUpdate = {
    id,
    donationMatchActive,
    maturityTime,
    splitToLiquid,
    ignoreUserSplits,
  };

  const methods = useForm<FV>({
    defaultValues: {
      beneficiaries: allowlistedBeneficiaries,
      contributors: allowlistedContributors,
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
