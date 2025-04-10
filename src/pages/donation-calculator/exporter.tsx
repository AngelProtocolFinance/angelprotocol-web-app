import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import type { View } from "./bg-view";
import { Content } from "./pdf-export";

export function Exporter({ view }: { view: View }) {
  // Adjusted to accept view as a prop
  const pageRef = useRef<HTMLDivElement>(null);

  const exportToPDF = async () => {
    const input = pageRef.current;
    if (!input) throw new Error("No input element found");

    await html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4"); // Portrait, millimeters, A4 size

        const a4Width = 210; // A4 width in mm
        const a4Height = 297; // A4 height in mm

        // Canvas dimensions (in pixels)
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;

        // Calculate the height of the content when scaled to A4 width
        const pdfContentWidth = a4Width;
        const pdfContentHeight =
          (contentHeight * pdfContentWidth) / contentWidth;

        // Height of one A4 page in the scaled content
        const pageContentHeight = a4Height; // Each page should be 297mm tall in the PDF
        const totalPages = 4; // Fixed to 4 pages as per your requirement

        // Ensure the content height matches 4 A4 pages (optional validation)
        if (pdfContentHeight < a4Height * totalPages) {
          console.warn(
            "Content height is less than 4 A4 pages. Adjusting may be needed."
          );
        }

        for (let i = 0; i < totalPages; i++) {
          if (i > 0) pdf.addPage();

          // Calculate the y-offset to show the correct portion of the image
          const yOffset = i * pageContentHeight;

          pdf.addImage(
            imgData, // Image data
            "PNG", // Format
            0, // x position in the PDF
            -yOffset, // y position (move the image up to show the correct section)
            pdfContentWidth, // Width in the PDF (full A4 width)
            pdfContentHeight, // Full height of the content
            undefined, // No alias (optional)
            "FAST" // Compression mode for faster rendering
          );
        }

        pdf.save("four-page-document.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <>
      <button onClick={exportToPDF} className="mt-4 btn-blue">
        Export to PDF
      </button>
      <Content {...view} ref={pageRef} classes="absolute -left-[9999px]" />
    </>
  );
}
