import Image from "components/image";
import { Footer } from "../footer";
import { Benefits } from "./benefits";
import { Cta } from "./cta";
import footerImg from "./footer.webp";

export function Page3() {
  return (
    <div className="w-full grid">
      <Benefits />
      <Cta classes="mt-28" />
      <Image src={footerImg} />
      <Footer />
    </div>
  );
}
