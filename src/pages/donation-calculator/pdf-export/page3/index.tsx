import { Img, Pg } from "../components";
import { Footer } from "../footer";
import { Benefits } from "./benefits";
import { Cta } from "./cta";
import footerImg from "./footer.jpg";

export function Page3() {
  return (
    <Pg size="A4" style={{ display: "flex", position: "relative" }}>
      <Benefits />
      <Cta />
      <Img
        src={footerImg}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          objectFit: "cover",
        }}
      />
      <Footer />
    </Pg>
  );
}
