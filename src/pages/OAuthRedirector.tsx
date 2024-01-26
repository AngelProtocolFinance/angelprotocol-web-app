import { OAUTH_PATH_STORAGE_KEY } from "constants/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// For some reason aws-amplify redirects to this page twice; the slowness of the 2nd
// redirect causes the final URL to be of this page even though the rendered page is
// completely different (Marketplace, Register etc.).
// To account for this slowness, we set a timeout and navigate to the desired page afterwards.
const DELAY = 300;

export default function OAUTHRedirector() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(
      () => navigate(localStorage.getItem(OAUTH_PATH_STORAGE_KEY) ?? "/"),
      DELAY,
    );
    return () => {
      clearTimeout(timeout);
    };
  }, [navigate]);

  return <h3 className="text-3xl place-self-center p-5">Redirecting...</h3>;
}
