import { useLocation } from "react-router-dom";
import { routes } from "../types/types";

export default function useAppBackground() {
  const location = useLocation();
  switch (location.pathname) {
    case routes.login: {
      return "bg-blue-400";
    }
    case routes.home: {
      return "bg-white";
    }
    default: {
      return "bg-gradient-to-b from-thin-blue to-black-blue";
    }
  }
}
