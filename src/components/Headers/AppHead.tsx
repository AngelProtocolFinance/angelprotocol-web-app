import Logo from "components/Logo/Logo";
import Search from "components/Search/Search";
import TerraConnector from "components/TerraConnector/TerraConnector";

export default function AppHead() {
  return (
    <div className="flex items-center justify-between w-full padded-container h-24">
      <Logo />
      <div className="flex">
        <Search />
        <TerraConnector />
      </div>
    </div>
  );
}
