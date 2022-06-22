import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MemberUpdatorValues } from "pages/Admin/types";
import FormError from "pages/Admin/components/FormError";
import FormSkeleton from "pages/Admin/components/FormSkeleton";
import { useMembers } from "services/terra/admin/queriers";
import { useSetter } from "store/accessors";
import { setMembers } from "slices/admin/apCW4Members";
import MemberUpdateForm from "./MemberUpdaterForm";
import { memberUpdatorSchema } from "./memberUpdatorSchema";

export default function MemberUpdator() {
  const dispatch = useSetter();
  const { members, isMembersLoading, isError } = useMembers();

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

  if (isMembersLoading) return <FormSkeleton />;
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
    resolver: yupResolver(memberUpdatorSchema),
  });

  return (
    <FormProvider {...methods}>
      <MemberUpdateForm />
    </FormProvider>
  );
}
