import { useLocation } from "react-router-dom";
import { routes } from "../types/types";

export default function useAppBackground() {
  const location = useLocation();
  switch (location.pathname) {
    case routes.login: {
      return "bg-gradient-to-b from-blue-accent to-thin-grey";
    }
    case routes.contact:
    case routes.home: {
      return "bg-white";
    }
    case routes.about_unsdgs: {
      return "bg-white";
    }

    default: {
      return "bg-gradient-to-b from-blue-accent to-black-blue";
    }
  }
}
