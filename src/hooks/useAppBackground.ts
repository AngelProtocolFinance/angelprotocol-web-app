import { useLocation } from "react-router-dom";
import { routes } from "../types/types";

export default function useAppBackground() {
  const location = useLocation();
  switch (location.pathname) {
    case routes.login: {
      return "bg-gradient-to-b from-thin-blue to-thin-grey";
    }
    case routes.charities:
    case routes.donors:
    case routes.contact:
    case routes.home: {
      return "bg-white";
    }

    default: {
      return "bg-gradient-to-b from-thin-blue to-black-blue";
    }
  }
}
