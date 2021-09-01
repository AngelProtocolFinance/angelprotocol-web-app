import { routes } from "types/types";
import { useLocation } from "react-router-dom";

export default function useHeaderTextColor() {
  const location = useLocation();
  switch (location.pathname) {
    case routes.home: {
      return "text-black";
    }
    default: {
      return "text-white";
    }
  }
}
