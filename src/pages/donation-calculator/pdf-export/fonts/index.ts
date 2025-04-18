import { Font } from "@react-pdf/renderer";
import quicksand_bold from "./quicksand-bold.ttf";
import quicksand_light from "./quicksand-light.ttf";
import quicksand_medium from "./quicksand-medium.ttf";
import quicksand_regular from "./quicksand-regular.ttf";
import quicksand_semibold from "./quicksand-semibold.ttf";

Font.register({
  family: "Quicksand",
  fonts: [
    { fontWeight: 300, src: quicksand_light },
    { fontWeight: 400, src: quicksand_regular },
    { fontWeight: 500, src: quicksand_medium },
    { fontWeight: 600, src: quicksand_semibold },
    { fontWeight: 700, src: quicksand_bold },
  ],
});
