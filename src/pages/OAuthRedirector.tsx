import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoaderRing from "components/LoaderRing";
import { OAUTH_PATH_STORAGE_KEY } from "constants/o-auth";

export default function OAUTHRedirector() {
  const navigate = useNavigate();
  useEffect(() => {
    const from = localStorage.getItem(OAUTH_PATH_STORAGE_KEY);
    navigate(from || "/");
  }, [navigate]);
  return (
    <div className="grid place-items-center">
      <LoaderRing thickness={12} classes="w-32" />
    </div>
  );
}
