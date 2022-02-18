import { useCallback, useState } from "react";
import { useAddCharityMetadataMutation } from "services/aws/charity";
import { updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";
import { Values } from "./types";

export default function useRegisterWallet() {
  const [isSuccess, setSuccess] = useState(false);
  const [addCharityMetaProfile] = useAddCharityMetadataMutation();
  const dispatch = useSetter();
  const user = useGetter((state) => state.user);

  const handleFailure = useCallback((error) => {
    console.error(error);
    setSuccess(false);
  }, []);

  const handleSuccess = useCallback(
    (values: Values) => {
      const userData = { ...user, TerraWallet: values.walletAddress };

      dispatch(updateUserData(userData));
      localStorage.setItem("userData", JSON.stringify(userData));

      console.log("Your wallet address was saved successfully.");
      setSuccess(true);
    },
    [dispatch, user]
  );

  const registerWallet = useCallback(
    async (values: Values) => {
      const response: any = await addCharityMetaProfile({
        body: { TerraWallet: values.walletAddress },
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
        handleSuccess(values);
      }
    },
    [addCharityMetaProfile, user, handleFailure, handleSuccess]
  );

  return {
    registerWallet,
    isSuccess,
  };
}
