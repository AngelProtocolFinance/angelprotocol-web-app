import Image from "components/image";
import { Benefits } from "./benefits";
import { Cta } from "./cta";
import footerImg from "./footer.webp";

export function Page3() {
  return (
    <div className="w-full aspect-[1.41413]">
      <Benefits />
      <Cta />
      <Image src={footerImg} />
    </div>
  );
}
