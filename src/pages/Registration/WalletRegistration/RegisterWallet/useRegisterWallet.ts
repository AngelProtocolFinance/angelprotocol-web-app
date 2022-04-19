import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback, useState } from "react";
import { useUpdateCharityMetadataMutation } from "services/aws/registration";
import { UpdateCharityMetadataResult } from "services/aws/types";
import { useGetter, useSetter } from "store/accessors";
import { updateCharity } from "../../store";

export default function useRegisterWallet() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [updateMetadata, { isSuccess }] = useUpdateCharityMetadataMutation();
  const dispatch = useSetter();
  const charity = useGetter((state) => state.charity);

  const handleFailure = useCallback((error) => console.log(error), []);

  const handleSuccess = useCallback(
    (TerraWallet: string) => {
      dispatch(
        updateCharity({
          ...charity,
          Metadata: { ...charity.Metadata, TerraWallet },
        })
      );
    },
    [dispatch, charity]
  );

  const registerWallet = useCallback(
    async (walletAddress: string) => {
      setSubmitting(true);

      try {
        const response = await updateMetadata({
          body: { TerraWallet: walletAddress },
          PK: charity.ContactPerson.PK,
        });

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
    [updateMetadata, charity, handleFailure, handleSuccess]
  );

  return { registerWallet, isSuccess, isSubmitting };
}
