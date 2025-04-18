import { socials } from "constants/urls";
import { A, Img, type Style, T, V } from "./components";
import facebook from "./icons/facebook.png";
import instagram from "./icons/instagram.png";
import intercom from "./icons/intercom.png";
import linkedin from "./icons/linkedin.png";
import x from "./icons/x.png";
import youtube from "./icons/youtube.png";
import { fs, blue, fw, gray, w } from "./styles";

function Socials({ style = {} }: { style?: object }) {
  const iconContainerStyle: Style = {
    backgroundColor: gray.l6,
    width: 28,
    height: 28,
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const iconStyle: Style = {};

  return (
    <V
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: w["6"],
        ...style,
      }}
    >
      <A href={socials.linkedin} style={iconContainerStyle}>
        <Img
          style={{
            ...iconStyle,
            width: 27 * 0.8,
            left: 2,
            position: "relative",
          }}
          src={linkedin}
        />
      </A>
      <A href={socials.facebook} style={iconContainerStyle}>
        <Img style={{ ...iconStyle, width: 25.2 * 0.7 }} src={facebook} />
      </A>
      <A href={socials.x} style={iconContainerStyle}>
        <Img style={{ ...iconStyle, width: 20 * 0.7 }} src={x} />
      </A>
      <A href={socials.youtube} style={iconContainerStyle}>
        <Img style={{ ...iconStyle, width: 28.8 * 0.7 }} src={youtube} />
      </A>
      <A href={socials.instagram} style={iconContainerStyle}>
        <Img style={{ ...iconStyle, width: 25.2 * 0.7 }} src={instagram} />
      </A>
      <A href={socials.intercom} style={iconContainerStyle}>
        <Img style={{ ...iconStyle, width: 25.2 * 0.7 }} src={intercom} />
      </A>
    </V>
  );
}

export function Footer({ style = {} }: { style?: object }) {
  return (
    <V
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: blue.d,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: w["14"],
        color: gray.l6,
        ...style,
      }}
    >
      <T
        style={{
          fontSize: fs.xl - 2,
          fontWeight: fw.b,
        }}
      >
        Keep in touch!
      </T>
      <Socials style={{ marginLeft: "auto" }} />
      <T
        style={{
          maxWidth: 220,
          marginLeft: "auto",
          fontSize: fs.sm,
        }}
      >
        Copyright © {new Date().getFullYear()} Better Giving. All rights
        reserved. The information provided by Better Giving in this material is
        for informational and illustrative purposes only, and is subject to
        change.
      </T>
    </V>
  );
}
