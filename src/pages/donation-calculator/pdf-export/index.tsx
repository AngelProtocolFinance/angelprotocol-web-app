import { useSearchParams } from "@remix-run/react";
import { ogInput, ogInputDefault } from "types/donation-calculator";
import { safeParse } from "valibot";
import { bgView } from "../bg-view";
import "./fonts";
import { Page1 } from "./page1";
// import { Page2 } from "./page2";
// import { Page3 } from "./page3";

import { Document, PDFViewer } from "@react-pdf/renderer";
import { ClientOnly } from "remix-utils/client-only";
import { styles } from "./styles";

export default function PdfExport() {
  const [params] = useSearchParams();
  const res = safeParse(ogInput, Object.fromEntries(params.entries()));
  const view = bgView(res.issues ? ogInputDefault : res.output);
  return (
    <ClientOnly>
      {() => (
        <PDFViewer width="100%" height="100%">
          <Document style={styles.doc}>
            <Page1 v={view} />
          </Document>
        </PDFViewer>
      )}
    </ClientOnly>

    // <div className="w-[1300px] [&>div]:h-[1838.571px] mx-auto font-heading">
    //   <Page1 v={view} />
    //   <Page2 v={view} />
    //   <Page3 />
    //   <Page4 />
    // </div>
  );
}
