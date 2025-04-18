import { Img, Pg } from "../components";
import { Footer } from "../footer";
import { Benefits } from "./benefits";
import { Cta } from "./cta";
import footerImg from "./footer.png";

export function Page3() {
  return (
    <Pg style={{ display: "flex", position: "relative" }}>
      <Benefits />
      <Cta />
      <Img src={footerImg} style={{}} />
      <Footer />
    </Pg>
  );
}
