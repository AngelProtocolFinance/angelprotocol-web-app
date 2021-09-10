import Connector from "./Connector";
import Installer from "./Installer";
import Status from "./Status";

export default function Wallet() {
  return (
    //only one renders at a time
    <>
      <Status />
      <Installer />
      <Connector />
    </>
  );
}
