import { FormError, FormSkeleton } from "components/admin";
import { useEndowment } from "services/aws/useEndowment";
import { useAdminContext } from "../../Context";
import Form from "./Form";

export default function Settings() {
  const { id } = useAdminContext();
  const {
    data: endow,
    isLoading,
    isError,
  } = useEndowment({ id }, [
    "receiptMsg",
    "sfCompounded",
    "hide_bg_tip",
    "progDonationsAllowed",
    "splitLiqPct",
    "splitFixed",
    "payout_minimum",
    "donateMethods",
  ]);

  if (isLoading) {
    return <FormSkeleton classes="max-w-4xl justify-self-center mt-6" />;
  }

  if (isError || !endow) {
    return <FormError errorMessage="Failed to load settings" />;
  }

  return <Form id={id} {...endow} />;
}
