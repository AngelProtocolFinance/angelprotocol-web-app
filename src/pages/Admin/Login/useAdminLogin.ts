import * as Yup from "yup";
// import { toast } from "react-toastify";

// import { aws_endpoint } from "constants/urls";
import { useSetToken } from "contexts/AuthProvider";
import { useHistory } from "react-router-dom";
import { admin } from "types/routes";

export interface AdminLoginData {
  UserName: string;
  Password: string;
}

export const AdminLoginSchema = Yup.object().shape({
  UserName: Yup.string().required("Please enter your username."),
  Password: Yup.string().required("Please enter your password."),
});

export const useAdminLogin = () => {
  const { saveToken } = useSetToken();
  const history = useHistory();
  const handleAPLogin = async (data: AdminLoginData) => {
    // test
    history.push(admin.charity_applications);
    saveToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVVUlEIjoiMDhjM2QxNDYtNTBiZC00YTkxLWFlMDAtYzMxOWZlMzc1ZDRmIiwiaWF0IjoxNjM3MTQ4MzE2LCJleHAiOjE3MzcxOTE1MTZ9.UKxt1WQs6DyEXDvMm9IOZxl53KCo9pVJuE27akdkS_Q",
      "admin"
    );
    return;
    // test

    // try {
    //   const response = await fetch(aws_endpoint + "/ap-login", {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //   });

    //   if (response.status === 200) {
    //     const data = await response.json();
    //     //don't perform state update because form would unmount
    //     saveToken(data.accessToken, "admin");
    //     //no need to push, Redirect/> on Login/> will detect state change and have page redirected
    //     history.push(admin.charity_applications);
    //   } else if (response.status === 403) {
    //     toast.error("Unauthorized");
    //   } else {
    //     toast.error("Something went wrong");
    //   }
    // } catch (error) {
    //   toast.error("Something went wrong");
    // }
  };
  return handleAPLogin;
};
