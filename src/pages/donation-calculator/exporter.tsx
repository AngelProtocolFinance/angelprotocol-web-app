import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import type { View } from "./bg-view";
import { Content } from "./pdf-export";

const A4 = {
  h: 297,
  w: 210,
};

export const Exporter = ({ view }: { view: View }) => {
  const ref = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!ref.current) throw `content not found`;

    await document.fonts.ready;

    const canvas = await html2canvas(ref.current, { scale: 2 });
    const pdf = new jsPDF("p", "mm", "a4");

    for (let i = 0; i < 4; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        -i * A4.h,
        A4.w,
        (A4.w / canvas.width) * canvas.height,
        undefined,
        "FAST"
      );
    }

    pdf.save("four-page-document.pdf");
  };

  return (
    <>
      <button onClick={generatePDF} className="mt-4 btn-blue">
        Export to PDF
      </button>
      <Content {...view} ref={ref} classes="absolute -left-[9999px]" />
    </>
  );
};
