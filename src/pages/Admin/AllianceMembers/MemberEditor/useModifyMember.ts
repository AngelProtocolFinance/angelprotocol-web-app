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
    const type = getValues("type");
    let response;
    if (type === "edit") {
      response = await editMember(data);
    } else {
      response = await createMember(data);
    }
    if ("error" in response) {
      setError("failed to add member");
    } else {
      hideModal();
    }
  }

  return {
    error,
    modifyMember: handleSubmit(modifyMember),
    isSubmitDisabled: !isDirty || !isValid || isSubmitting,
  };
}
