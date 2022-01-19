import Proposals from "./Proposals";

export default function Dashboard() {
  return (
    <div className="padded-container grid content-start">
      <h2 className="font-heading uppercase font-bold text-4xl mt-4 text-white-grey">
        Admin
      </h2>
      <Proposals />
    </div>
  );
}
