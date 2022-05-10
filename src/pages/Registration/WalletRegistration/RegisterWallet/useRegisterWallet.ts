import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback, useState } from "react";
import { UpdateCharityMetadataResult } from "@types-server/aws";
import { useUpdateCharityMetadataMutation } from "services/aws/registration";
import { useGetter, useSetter } from "store/accessors";
import { updateCharity } from "../../store";

type Result =
  | { data: UpdateCharityMetadataResult }
  | { error: FetchBaseQueryError | SerializedError };

export default function useRegisterWallet() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [updateMetadata, { isSuccess }] = useUpdateCharityMetadataMutation();
  const dispatch = useSetter();
  const charity = useGetter((state) => state.charity);

  const handleError = useCallback((error) => console.log(error), []);

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

  const handleResult = useCallback(
    (result: Result) => {
      const dataResult = result as {
        data: UpdateCharityMetadataResult;
        error: FetchBaseQueryError | SerializedError;
      };

      if (!!dataResult.error) {
        handleError(JSON.stringify(dataResult.error));
      } else {
        handleSuccess(dataResult.data.TerraWallet);
      }
    },
    [handleError, handleSuccess]
  );

  const registerWallet = useCallback(
    async (walletAddress: string) => {
      setSubmitting(true);

      try {
        const result = await updateMetadata({
          body: { TerraWallet: walletAddress },
          PK: charity.ContactPerson.PK,
        });

        handleResult(result);
      } catch (error) {
        handleError(error);
      } finally {
        setSubmitting(false);
      }
    },
    [updateMetadata, charity, handleError, handleResult]
  );

  return { registerWallet, isSuccess, isSubmitting };
}
