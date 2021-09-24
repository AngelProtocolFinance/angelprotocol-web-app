import { useLocation } from "react-router-dom";
import { site, app } from "../types/routes";

export default function useAppBackground() {
  const location = useLocation();
  switch (location.pathname) {
    case `${site.app}/${app.login}`: {
      return "bg-gradient-to-b from-blue-accent to-thin-grey";
    }

    default: {
      return "bg-gradient-to-b from-blue-accent to-black-blue";
    }
  }
}
