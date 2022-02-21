import { useCallback, useState } from "react";
import { useAddCharityMetadataMutation } from "services/aws/charity";
import { updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";

export default function useRegisterWallet() {
  const [isSuccess, setSuccess] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [addCharityMetaProfile] = useAddCharityMetadataMutation();
  const dispatch = useSetter();
  const user = useGetter((state) => state.user);

  const handleFailure = useCallback((error) => {
    console.error(error);
    setSuccess(false);
  }, []);

  const handleSuccess = useCallback(
    (walletAddress: string) => {
      const userData = { ...user, TerraWallet: walletAddress };

      dispatch(updateUserData(userData));
      localStorage.setItem("userData", JSON.stringify(userData));

      console.log("Your wallet address was saved successfully.");
      setSuccess(true);
    },
    [dispatch, user]
  );

  const registerWallet = useCallback(
    async (walletAddress: string) => {
      setSubmitting(true);

      try {
        const response: any = await addCharityMetaProfile({
          body: { TerraWallet: walletAddress },
          uuid: user.PK,
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
    [addCharityMetaProfile, user, handleFailure, handleSuccess]
  );

  return { registerWallet, isSuccess, isSubmitting };
}
