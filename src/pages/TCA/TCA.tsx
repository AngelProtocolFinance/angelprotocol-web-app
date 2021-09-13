// import Donator from "components/Donator/Donator";
import Donator from "components/DonationForm";
import { useGetToken, useSetToken } from "contexts/AuthProvider";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { Redirect } from "react-router";
import { routes } from "types/types";

export default function TCA() {
  const { deleteToken } = useSetToken();
  const token = useGetToken();

  //user can't access TCA page when not logged in or his prev token expired
  if (token) {
    const decodedToken: JwtPayload = jwtDecode(token);
    const expiry = decodedToken.exp!;
    if (expiry * 1000 <= Date.now()) {
      //delete expired token to avoid these checks everytime
      deleteToken();
      return <Redirect to={routes.login} />;
    }
  } else {
    return <Redirect to={routes.login} />;
  }

  return (
    <div className="pt-24 grid place-items-center">
      <Donator pushTransactionStatus={"pushTransactionStatus"} />
    </div>
  );
}
