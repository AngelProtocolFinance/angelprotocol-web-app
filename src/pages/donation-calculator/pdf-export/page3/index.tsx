import Image from "components/image";
import { Footer } from "../footer";
import { Benefits } from "./benefits";
import { Cta } from "./cta";
import footerImg from "./footer.webp";

export function Page3() {
  return (
    <div className="w-full flex flex-col">
      <Benefits />
      <Cta classes="mt-28" />
      <Image width={1300} height={917} src={footerImg} className="mt-auto" />
      <Footer />
    </div>
  );
}
