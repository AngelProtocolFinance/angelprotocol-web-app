import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AllianceEditValues } from "pages/Admin/types";
import FormError from "pages/Admin/common/FormError";
import FormSkeleton from "pages/Admin/common/FormSkeleton";
import { useAllianceMembersQuery } from "services/juno/indexFund";
import { useSetter } from "store/accessors";
import { setMembers } from "slices/admin/allianceMembers";
import AllianceEditForm from "./AllianceEditForm";
import { allianceEditSchema } from "./alllianceEditSchema";

export default function AllianceEditor() {
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

  return <AllianceEditContext />;
}

function AllianceEditContext() {
  const methods = useForm<AllianceEditValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(allianceEditSchema),
  });

  return (
    <FormProvider {...methods}>
      <AllianceEditForm />
    </FormProvider>
  );
}
