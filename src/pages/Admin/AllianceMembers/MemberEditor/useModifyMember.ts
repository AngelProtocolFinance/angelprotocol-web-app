import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  useCreateNewMemberMutation,
  useEditMemberMutation,
} from "services/aws/alliance/alliance";
import { useSetModal } from "components/Modal/Modal";
import { MemberEditValues as MV } from "./schema";

export default function useModifyMember() {
  const {
    getValues,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext<MV>();

  const { hideModal } = useSetModal();
  const [error, setError] = useState<string | null>(null);
  const [createMember] = useCreateNewMemberMutation();
  const [editMember] = useEditMemberMutation();

  async function modifyMember(data: MV) {
    const { type, ...restData } = data;
    let response;
    if (type === "edit") {
      response = await editMember(restData);
    } else {
      response = await createMember(restData);
    }
    if ("error" in response) {
      setError("failed to save changes");
    } else {
      hideModal();
    }
  }

  return {
    error,
    modifyMember: handleSubmit(modifyMember),
    isSubmitDisabled: !isDirty || !isValid || isSubmitting,
    isEdit: getValues("type") === "edit",
  };
}
