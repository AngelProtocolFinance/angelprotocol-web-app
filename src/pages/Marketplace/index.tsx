import { useEndowmentsQuery } from "services/juno/account";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";

export default function Marketplace() {
  const { data } = useEndowmentsQuery({});
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 grid-rows-[auto_1fr] padded-container pb-16 pt-4 min-h-screen text-gray-d2">
      <Toolbar />
      <Sidebar />
      <div className="bg-blue">cards</div>
    </div>
  );
}
