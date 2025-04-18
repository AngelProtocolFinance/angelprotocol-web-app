import { socials } from "constants/urls";
import { A, Img, type Style, T, V } from "./components"; // Import react-pdf components
import facebook from "./icons/facebook.png";
import instagram from "./icons/instagram.png";
import intercom from "./icons/intercom.png";
import linkedin from "./icons/linkedin.png";
import x from "./icons/x.png";
import youtube from "./icons/youtube.png";
import { fs, blue, fw, gray, w } from "./styles"; // Import styles

function Socials({ style = {} }: { style?: object }) {
  const iconContainerStyle: Style = {
    backgroundColor: gray.l6, // bg-white
    padding: w["2"], // p-1 (adjust value as needed)
    width: 36, // size-12 (adjust value as needed)
    height: 36, // size-12 (adjust value as needed)
    borderRadius: 6, // rounded-lg (adjust value as needed)
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const iconStyle = {
    padding: w["2"], // p-1
  };

  return (
    <V style={{ display: "flex", flexDirection: "row", gap: w["6"], ...style }}>
      <A href={socials.linkedin} style={iconContainerStyle}>
        <Img
          style={{ ...iconStyle, width: 30 /* width={40} */ }} // Adjusted width
          src={linkedin}
        />
      </A>
      <A href={socials.facebook} style={iconContainerStyle}>
        <Img
          style={{ ...iconStyle, width: 28 /* width={36} */ }} // Adjusted width
          src={facebook}
        />
      </A>
      <A href={socials.x} style={iconContainerStyle}>
        <Img
          style={{ ...iconStyle, width: 24 /* width={30} */ }} // Adjusted width
          src={x}
        />
      </A>
      <A href={socials.youtube} style={iconContainerStyle}>
        <Img
          style={{ ...iconStyle, width: 32 /* width={42} */ }} // Adjusted width
          src={youtube}
        />
      </A>
      <A href={socials.instagram} style={iconContainerStyle}>
        <Img
          style={{ ...iconStyle, width: 28 /* width={36} */ }} // Adjusted width
          src={instagram}
        />
      </A>
      <A href={socials.intercom} style={iconContainerStyle}>
        <Img
          style={{ ...iconStyle, width: 28 /* width={36} */ }} // Adjusted width
          src={intercom}
        />
      </A>
    </V>
  );
}

export function Footer({ style = {} }: { style?: object }) {
  return (
    <V
      fixed // Make footer appear on every page
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: blue.d, // bg-blue
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: w["14"], // p-8 (adjust value as needed)
        color: gray.l6, // text-white
        ...style,
      }}
    >
      <T
        style={{
          fontSize: fs.xl, // text-4xl (adjust value as needed)
          fontWeight: fw.b, // font-bold
        }}
      >
        Keep in touch!
      </T>
      <Socials style={{ marginLeft: "auto" }} />
      <T
        style={{
          maxWidth: 300, // max-w-lg (adjust value as needed)
          marginLeft: "auto",
          fontSize: fs.sm, // Adjust size as needed
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
