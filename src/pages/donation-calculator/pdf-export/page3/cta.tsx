import { laira } from "assets/laira/laira";
import { BOOK_A_DEMO } from "constants/env";
import { A, Img, T, V } from "../components";
import { fs, amber, fw, w } from "../styles";

export function Cta() {
  return (
    <V style={{ position: "relative", marginTop: w["10"] }}>
      <V
        style={{
          position: "absolute",
          left: w["14"],
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <A href={BOOK_A_DEMO}>
          <Img src={laira.yellow} style={{ width: 90, height: 116 }} />
        </A>
      </V>
      <V
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <A
          href={BOOK_A_DEMO}
          style={{
            backgroundColor: amber.d,
            paddingVertical: w["4"],
            paddingHorizontal: w["6"],
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          <T
            style={{
              fontSize: fs.lg,
              fontWeight: fw.b,
              color: "white",
            }}
          >
            Book A Demo!
          </T>
        </A>
      </V>
      <V
        style={{
          position: "absolute",
          right: w["14"],
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <Img src={laira.pointing} style={{ width: 120, height: 177 }} />
      </V>
    </V>
  );
}
