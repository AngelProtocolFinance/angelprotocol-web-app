import Accounts from "./Accounts";
import Strategies from "./AllocEditor";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-x-3 content-start justify-center">
      <Accounts />
      <Strategies />
    </div>
  );
}
