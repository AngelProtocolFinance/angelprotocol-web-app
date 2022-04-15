import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback, useState } from "react";
import { updateUser } from "pages/Registration/store";
import { useUpdateCharityMetadataMutation } from "services/aws/registration";
import { UpdateCharityMetadataResult } from "services/aws/types";
import { useGetter, useSetter } from "store/accessors";

export default function useRegisterWallet() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [updateMetadata, { isSuccess }] = useUpdateCharityMetadataMutation();
  const dispatch = useSetter();
  const user = useGetter((state) => state.user);

  const handleFailure = useCallback((error) => console.log(error), []);

  const handleSuccess = useCallback(
    (TerraWallet: string) => {
      dispatch(
        updateUser({
          ...user,
          Metadata: { ...user.Metadata, TerraWallet },
        })
      );
    },
    [dispatch, user]
  );

  const registerWallet = useCallback(
    async (walletAddress: string) => {
      setSubmitting(true);

      try {
        const response = await updateMetadata({
          body: { TerraWallet: walletAddress },
          PK: user.ContactPerson.PK,
        });
        console.log(response);

        const result = response as {
          data: UpdateCharityMetadataResult;
          error: FetchBaseQueryError | SerializedError;
        };

        if (!!result.error) {
          handleFailure(JSON.stringify(result.error));
        } else {
          handleSuccess(result.data.TerraWallet);
        }
      } catch (error) {
        handleFailure(error);
      } finally {
        setSubmitting(false);
      }
    },
    [updateMetadata, user, handleFailure, handleSuccess]
  );

  return { registerWallet, isSuccess, isSubmitting };
}
