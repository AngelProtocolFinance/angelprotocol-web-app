import AppFoot from "components/Footers/AppFoot";
import MarketFoot from "components/Footers/MarketFoot";
import { useLocation } from "react-router";
import { routes } from "types/types";

export default function Footer() {
  const location = useLocation();
  switch (location.pathname) {
    case routes.tca: {
      return <AppFoot />;
    }
    default:
      return <MarketFoot />;
  }
}
