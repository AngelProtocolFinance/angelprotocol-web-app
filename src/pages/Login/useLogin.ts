import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useErrorContext } from "contexts/ErrorContext";
import { useGetter, useSetter } from "store/accessors";
import { saveToken } from "slices/authSlice";
import { APIs } from "constants/urls";
import { loginSchema } from "./loginSchema";

export default function useLogin() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<{ password: string }>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const { tca: tcaToken } = useGetter((state) => state.auth);
  const dispatch = useSetter();
  const { handleError } = useErrorContext();

  async function login(values: { password: string }) {
    //start request
    try {
      const response = await fetch(APIs.aws + "/tca-login", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        const data = await response.json();
        //don't perform state update because form would unmount
        dispatch(saveToken(data.accessToken));
        //no need to push, Redirect/> on Login/> will detect state change and have page redirected
      } else if (response.status === 403) {
        throw new Error("Unauthorized");
      } else {
        throw new Error("Something wen't wrong");
      }
    } catch (error) {
      handleError(error);
    }
  }

  return {
    tcaToken,
    register,
    login: handleSubmit(login),
    isSubmitting,
    errors,
  };
}
