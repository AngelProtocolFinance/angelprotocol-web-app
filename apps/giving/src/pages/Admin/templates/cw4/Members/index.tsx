import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MemberUpdatorValues } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import { useMembersQuery } from "services/juno/cw4";
import { FormError, FormSkeleton } from "components/admin";
import { useSetter } from "store/accessors";
import { setMembers } from "slices/admin/apCW4Members";
import MemberUpdateForm from "./Form";
import { schema } from "./schema";

export default function Members() {
  const { cw4 } = useAdminResources();
  const dispatch = useSetter();
  const { data: members = [], isLoading, isError } = useMembersQuery(cw4);

  useEffect(() => {
    if (members.length > 0) {
      dispatch(
        setMembers(
          members.map((member) => ({
            ...member,
            is_deleted: false,
            is_added: false,
          }))
        )
      );
    }
  }, [members, dispatch]);

  if (isLoading) return <FormSkeleton />;
  if (isError) return <FormError errorMessage="failed to load group members" />;
  return <MemberUpdateContext />;
}

function MemberUpdateContext() {
  const methods = useForm<MemberUpdatorValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      addr: "",
      weight: "1",
    },
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <MemberUpdateForm />
    </FormProvider>
  );
}
