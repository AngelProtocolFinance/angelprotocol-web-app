import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";

export default function Funds() {
  return <Link to={appRoutes.funds + "/new"}>Create fund</Link>;
}
