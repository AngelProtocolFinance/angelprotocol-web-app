import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { InitReg } from "services/aws/registration/types";
import { useRegQuery } from "services/aws/registration";
import routes from "../routes";
import Contact from "./Contact";
import Documentation from "./Docs";

export default function Steps() {
  const { state } = useLocation();
  const initReg = state as InitReg | undefined; //from non "/steps" navigations

  const ref = initReg?.reference || "";
  const { data, isLoading, isFetching, isError } = useRegQuery(ref, {
    skip: !ref,
  });

  /** should use cache data since "resume" already lazy queried it */
  if (isLoading) {
    return <p>fetching registration data</p>;
  }

  if (isError) {
    return <p>failed to get registration data - please try again later</p>;
  }

  /**
   * visiting /steps without setting state (e.g via url bar) would just
   * redirects to signup page
   */
  if (!data || !initReg) {
    return <Navigate to={routes.index} />;
  }

  return (
    <Routes>
      <Route path="1" element={<Contact state={data} thisStep={1} />} />
      <Route path="2" element={<Documentation state={data} thisStep={2} />} />
      <Route path="3" />
      <Route path="4" />
      <Route path="5" />
    </Routes>
  );
}
