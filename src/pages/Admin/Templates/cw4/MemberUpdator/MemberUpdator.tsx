import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MemberUpdatorValues } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import FormError from "pages/Admin/common/FormError";
import FormSkeleton from "pages/Admin/common/FormSkeleton";
import { useMembersQuery } from "services/juno/cw4";
import { queryObject } from "services/juno/queryContract/queryObjects";
import { useSetter } from "store/accessors";
import { setMembers } from "slices/admin/apCW4Members";
import MemberUpdateForm from "./MemberUpdaterForm";
import { memberUpdatorSchema } from "./memberUpdatorSchema";

export default function MemberUpdator() {
  const { cw4 } = useAdminResources();
  const dispatch = useSetter();
  const {
    data: members = [],
    isLoading,
    isError,
  } = useMembersQuery({ address: cw4, msg: queryObject.cw4Members });

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
    resolver: yupResolver(memberUpdatorSchema),
  });

  return (
    <FormProvider {...methods}>
      <MemberUpdateForm />
    </FormProvider>
  );
}
