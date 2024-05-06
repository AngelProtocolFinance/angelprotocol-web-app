import { FormError, FormSkeleton } from "components/admin";
import { useEndowment } from "services/aws/useEndowment";
import Form from "./Form";

export default function Settings() {
  const {
    data: endow,
    isLoading,
    isError,
  } = useEndowment({ id }, ["receiptMsg", "sfCompounded"]);

  if (isLoading) {
    return <FormSkeleton classes="max-w-4xl justify-self-center mt-6" />;
  }

  if (isError || !endow) {
    return <FormError errorMessage="Failed to load settings" />;
  }

  return (
    <Form
      receiptMsg={endow.receiptMsg}
      id={id}
      isSfCompounded={endow.sfCompounded}
    />
  );
}
