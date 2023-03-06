import Image from "components/Image";
import { useProfileContext } from "./ProfileContext";

export default function Logo() {
  const { logo } = useProfileContext();

  return (
    <div className="padded-container flex justify-center items-center w-full overflow-visible h-0 isolate lg:justify-start">
      <Image
        src={logo}
        className="h-48 w-48 border border-prim rounded-full object-cover bg-white"
      />
    </div>
  );
}
