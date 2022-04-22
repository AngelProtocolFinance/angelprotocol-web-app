import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormError from "pages/Admin/components/FormError";
import FormSkeleton from "pages/Admin/components/FormSkeleton";
import { useAllianceMembers } from "services/terra/indexFund/queriers";
import { setMembers } from "slices/admin/allianceMembers";
import { useSetter } from "store/accessors";
import AllianceEditForm from "./AllianceEditForm";
import { AllianceEditValues, allianceEditSchema } from "./alllianceEditSchema";

export default function AllianceEditor() {
  const dispatch = useSetter();
  const { allianceMembers, isAllianceMembersLoading, isError } =
    useAllianceMembers();

  useEffect(() => {
    if (isAllianceMembersLoading) return;
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
  }, [dispatch, allianceMembers, isAllianceMembersLoading]);

  if (isAllianceMembersLoading) return <FormSkeleton />;
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
