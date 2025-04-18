import lairaPointing from "assets/laira/laira-pointing-x2-left.png";
import lairaYellow from "assets/laira/laira-yellow-x2.png";
import { BOOK_A_DEMO } from "constants/env";
import { A, Img, V } from "../components";
import { fs, blue, fw, w } from "../styles";

export function Cta() {
  return (
    <V
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        gap: w["4"],
        marginTop: 100,
      }}
    >
      <Img src={lairaYellow} style={{ width: 60 }} />
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
            left: w["20"],
            backgroundColor: blue.d,
            paddingVertical: w["10"],
            paddingHorizontal: w["14"],
            borderRadius: 999,
            fontSize: fs.lg,
            fontWeight: fw.b,
            color: "white",
            textDecoration: "none",
            textTransform: "uppercase",
            alignSelf: "flex-start",
          }}
        >
          Book A Demo!
        </A>
      </V>

      <Img
        src={lairaPointing}
        style={{ width: 70, position: "relative", bottom: w["20"] }}
      />
    </V>
  );
}
