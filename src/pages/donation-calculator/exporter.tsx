import { BASE_URL, BOOK_A_DEMO } from "constants/env";
import { socials } from "constants/urls";
import { toCanvas } from "html-to-image";
import jsPDF from "jspdf";
import { useCallback, useRef, useState } from "react";
import { Content } from "./pdf-export";
import type { View } from "./types";

const A4 = {
  width: 210,
  height: 297,
} as const;

interface ExporterProps {
  view: View;
  classes?: string;
}

export const Exporter = ({ view, classes = "" }: ExporterProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const generatePDF = useCallback(async () => {
    if (!contentRef.current) {
      console.error("Content reference not found");
      return;
    }

    setIsExporting(true);

    // Store original styles
    const originalStyles = {
      position: contentRef.current.style.position,
      left: contentRef.current.style.left,
      top: contentRef.current.style.top,
      zIndex: contentRef.current.style.zIndex,
      visibility: contentRef.current.style.visibility,
    };

    try {
      // Prepare content for capture
      Object.assign(contentRef.current.style, {
        position: "fixed",
        left: "0",
        top: "0",
        zIndex: "-1000",
        visibility: "visible",
      });

      await document.fonts.ready;

      const canvas = await toCanvas(contentRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        skipAutoScale: true,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const imgWidth = A4.width;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const imgData = canvas.toDataURL("image/png", 0.9);

      // Hardcode to 4 pages
      for (let i = 0; i < 4; i++) {
        if (i > 0) {
          pdf.addPage();
        }

        // Add image first
        pdf.addImage({
          imageData: imgData,
          format: "PNG",
          x: 0,
          y: -i * A4.height,
          width: imgWidth,
          height: imgHeight,
          compression: "FAST",
        });

        //page1 logo
        if (i === 0) {
          pdf.link(160, 7, 46, 20, {
            url: BASE_URL,
          });
        }

        //page3 demo
        if (i === 2) {
          pdf.link(87, 110, 36, 10, {
            url: BOOK_A_DEMO,
          });
        }
        //page4 logo
        if (i === 3) {
          pdf.link(160, 10, 46, 17, {
            url: BASE_URL,
          });
        }

        //socials
        if (i === 3 || i === 2) {
          const size = [8, 8] as const;
          const y = 284;
          pdf.link(50, y, ...size, { url: socials.linkedin });
          pdf.link(62, y, ...size, { url: socials.facebook });
          pdf.link(73, y, ...size, { url: socials.x });
          pdf.link(85, y, ...size, { url: socials.youtube });
          pdf.link(97, y, ...size, { url: socials.instagram });
          pdf.link(109, y, ...size, { url: socials.intercom });
        }
      }

      pdf.save(`document-${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      // Optionally: Add user notification here
    } finally {
      // Restore original styles
      Object.assign(contentRef.current.style, originalStyles);
      setIsExporting(false);
    }
  }, []);

  return (
    <>
      <button
        onClick={generatePDF}
        disabled={isExporting}
        className={`${classes} btn-blue px-4 py-1 rounded-full text-sm`}
      >
        {isExporting ? "Exporting.." : "Export to PDF"}
      </button>
      <Content
        view={view}
        ref={contentRef}
        classes="absolute -left-[9999px] invisible"
      />
    </>
  );
};
