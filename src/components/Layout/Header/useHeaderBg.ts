import { routes } from "types/types";
import { useLocation } from "react-router-dom";

export default function useHeaderBg() {
  const location = useLocation();
  switch (location.pathname) {
    case routes.home: {
      return "bg-white";
    }
    default: {
      return "bg-blue-400";
    }
  }
}
