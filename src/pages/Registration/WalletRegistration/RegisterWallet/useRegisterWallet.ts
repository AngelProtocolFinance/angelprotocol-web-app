import { useCallback, useState } from "react";
import { useUpdateCharityMetadataMutation } from "services/aws/registration";
import { User } from "services/user/types";
import { updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";

export default function useRegisterWallet() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [updateMetadata, { isSuccess }] = useUpdateCharityMetadataMutation();
  const dispatch = useSetter();
  const user = useGetter((state) => state.user);

  const handleFailure = useCallback((error) => console.log(error), []);

  const handleSuccess = useCallback(
    (TerraWallet: string) => {
      const userData: User = {
        ...user,
        Metadata: { ...user.Metadata, TerraWallet },
      };
      dispatch(updateUserData(userData));
      localStorage.setItem("userData", JSON.stringify(userData));
    },
    [dispatch, user]
  );

  const registerWallet = useCallback(
    async (walletAddress: string) => {
      setSubmitting(true);

      try {
        const response: any = await updateMetadata({
          body: { TerraWallet: walletAddress },
          PK: user.PK,
        });

        const result = response.data ? response : response.error;

        if (result.status === 500) {
          handleFailure("Saving data has failed. Please try again.");
        } else if (result.error) {
          handleFailure(result.error.data?.message);
        } else if (
          result.status === 400 ||
          result.status === 401 ||
          result.status === 403
        ) {
          handleFailure(result.data?.message);
        } else {
          handleSuccess(walletAddress);
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
