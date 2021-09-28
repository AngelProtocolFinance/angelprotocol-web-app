import Logo from "components/Logo/Logo";
import Search from "components/Search/Search";
import TerraConnector from "components/TerraConnector/TerraConnector";

export default function AppHead() {
  return (
    <div className="flex items-center justify-between xl:container xl:mx-auto w-full px-5">
      <Logo />
      <div className="flex">
        <Search />
        <TerraConnector />
      </div>
    </div>
  );
}
