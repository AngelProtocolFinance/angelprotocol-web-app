import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AllianceEditValues } from "pages/Admin/types";
import useQueryContract from "services/contract/useQueryContract";
import { FormError, FormSkeleton } from "components/admin";
import { useSetter } from "store/accessors";
import { setMembers } from "slices/admin/allianceMembers";
import Form from "./Form";
import { schema } from "./schema";

export default function Alliance() {
  const dispatch = useSetter();
  const { data, isLoading, error } = useQueryContract(
    "index-fund",
    "ifAlliance",
    null
  );

  useEffect(() => {
    const allianceMembers = data?.alliance_members || [];

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
  }, [dispatch, data, isLoading]);

  if (isLoading) return <FormSkeleton />;
  if (!!error)
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
