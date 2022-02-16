import { useForm } from "react-hook-form";
import { aws_endpoint } from "constants/urls";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetToken, useSetToken } from "contexts/AuthProvider";
import { loginSchema } from "./loginSchema";
import { useSetModal } from "components/Nodal/Nodal";
import Popup, { PopupProps } from "components/Popup/Popup";

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

  const decodedToken = useGetToken();
  const { saveToken } = useSetToken();
  const { showModal } = useSetModal();

  async function login(values: { password: string }) {
    //start request
    try {
      const response = await fetch(aws_endpoint + "/tca-login", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        const data = await response.json();
        //don't perform state update because form would unmount
        saveToken(data.accessToken);
        //no need to push, Redirect/> on Login/> will detect state change and have page redirected
      } else if (response.status === 403) {
        showModal<PopupProps>(Popup, { message: "Unauthorized" });
      } else {
        showModal<PopupProps>(Popup, { message: "Something wen't wrong" });
      }
    } catch (error) {
      showModal<PopupProps>(Popup, { message: "Something wen't wrong" });
    }
  }

  return {
    decodedToken,
    register,
    login: handleSubmit(login),
    isSubmitting,
    errors,
  };
}
