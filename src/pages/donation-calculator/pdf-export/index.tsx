import { useSearchParams } from "react-router";
import { ogInput, ogInputDefault } from "types/donation-calculator";
import { safeParse } from "valibot";
import { bgView } from "../bg-view";
import { Page1 } from "./page1";
import { Page2 } from "./page2";

import { Document, Font, PDFViewer } from "@react-pdf/renderer";
import { ClientOnly } from "remix-utils/client-only";
import { Page3 } from "./page3";
import { Page4 } from "./page4";
import { styles } from "./styles";

import { search } from "helpers/https";
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

export default function PdfExport() {
  const [params] = useSearchParams();
  const res = safeParse(ogInput, search(params));
  const view = bgView(res.issues ? ogInputDefault : res.output);
  return (
    <ClientOnly>
      {() => (
        <PDFViewer width="100%" height="100%">
          <Document title="better-giving-report" style={styles.doc}>
            <Page1 v={view} />
            <Page2 v={view} />
            <Page3 />
            <Page4 />
          </Document>
        </PDFViewer>
      )}
    </ClientOnly>
  );
}
