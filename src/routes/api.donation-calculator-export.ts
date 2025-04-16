import type { LoaderFunction } from "@vercel/remix";
import { browserlessApiToken } from ".server/env";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    // Construct the content URL (publicly accessible)
    const contentUrl =
      "https://angelprotocol-web-app-git-pdf-export-apjustins-projects.vercel.app/donation-calculator-export";

    // Browserless /pdf API request
    const response = await fetch(
      `https://production-sfo.browserless.io/pdf?token=${browserlessApiToken}`,
      {
        method: "POST",
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: contentUrl,
          viewport: {
            width: 1300,
            height: 1838.571 * 4,
          },
          options: {
            format: "A4",
            pageRanges: "1-4", // Hardcode to 4 pages
            timeout: 0,
            waitForFonts: true,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Browserless API error: ${response.statusText}`);
    }

    // Get PDF buffer
    const pdfBuffer = await response.arrayBuffer();

    // Return PDF as response
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="better-giving-report.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", JSON.stringify(error));
    return new Response("PDF generation failed", { status: 500 });
  }
};
