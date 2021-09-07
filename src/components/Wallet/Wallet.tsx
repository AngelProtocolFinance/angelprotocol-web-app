import Connector from "./Connector";
import Installer from "./Installer";
import Status from "./Status";

export default function Wallet() {
  return (
    <>
      <Status />
      <Installer />
      <Connector />
    </>
  );
}
