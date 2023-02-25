import { FormError, FormSkeleton } from "@giving/components/admin";
import { useAllianceMembersQuery } from "@giving/services/juno/indexFund";
import { setMembers } from "@giving/slices/admin/allianceMembers";
import { useSetter } from "@giving/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AllianceEditValues } from "@giving/types/pages/admin";
import Form from "./Form";
import { schema } from "./schema";

export default function Alliance() {
  const dispatch = useSetter();
  const {
    data: allianceMembers = [],
    isLoading,
    isError,
  } = useAllianceMembersQuery(null);

  useEffect(() => {
    if (isLoading) return;
    if (allianceMembers.length <= 0) return;

    dispatch(
      setMembers(
        allianceMembers.map((member) => ({
          ...member,
          isAdded: false,
          isDeleted: false,
        }))
      )
    );
  }, [dispatch, allianceMembers, isLoading]);

  if (isLoading) return <FormSkeleton />;
  if (isError)
    return <FormError errorMessage="failed to load alliance members" />;

  return <FormWithContext />;
}

function FormWithContext() {
  const methods = useForm<AllianceEditValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
