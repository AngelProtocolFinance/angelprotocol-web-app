import { Font } from "@react-pdf/renderer";
import quicksand_bold from "./fonts/quicksand-bold.ttf";
import quicksand_light from "./fonts/quicksand-light.ttf";
import quicksand_medium from "./fonts/quicksand-medium.ttf";
import quicksand_regular from "./fonts/quicksand-regular.ttf";
import quicksand_semibold from "./fonts/quicksand-semibold.ttf";

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

export {
  Image as Img,
  Page,
  Text as T,
  View as V,
  Page as Pg,
  Link as A,
} from "@react-pdf/renderer";
