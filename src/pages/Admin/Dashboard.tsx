import Proposals from "./Proposals/Proposals";
import Members from "./Members";

export default function Dashboard() {
  return (
    <div className="padded-container grid content-start m-h-screen pb-4">
      <h2 className="font-heading uppercase font-bold text-4xl mt-4 text-white-grey">
        Admin
      </h2>
      <Members />
      <Proposals />
    </div>
  );
}
