import { useEndowmentsQuery } from "services/juno/account";
import Toolbar from "./Toolbar";

export default function Marketplace() {
  const { data } = useEndowmentsQuery({});
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] padded-container pb-16">
      <Toolbar />
      <div>side bar</div>
      <div className="bg-blue">cards</div>
    </div>
  );
}
