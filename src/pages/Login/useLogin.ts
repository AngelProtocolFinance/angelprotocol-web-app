import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import { useGetter, useSetter } from "store/accessors";
import { saveToken } from "slices/authSlice";
import { aws_endpoint } from "constants/urls";
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
  const { showModal } = useModalContext();

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
        dispatch(saveToken(data.accessToken));
        //no need to push, Redirect/> on Login/> will detect state change and have page redirected
      } else if (response.status === 403) {
        showModal(Popup, { message: "Unauthorized" });
      } else {
        showModal(Popup, { message: "Something wen't wrong" });
      }
    } catch (error) {
      showModal(Popup, { message: "Something wen't wrong" });
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
