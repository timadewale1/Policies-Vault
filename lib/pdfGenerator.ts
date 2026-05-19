/**
 * PDF Generator utility for converting html content to PDF
 */

interface GeneratePdfOptions {
  title: string;
  content: string;
  type?: string;
  status?: string;
  contentFormat?: "markdown" | "html" | "pdf";
}

export async function generateAndDownloadPdf(options: GeneratePdfOptions) {
  const { title, content, type, status, contentFormat = "markdown" } = options;

  if (!content && !title) {
    throw new Error("Add title and content to download PDF");
  }

  try {
    // Import jsPDF and html2canvas
    const { jsPDF } = await import("jspdf");
    const html2canvas = (await import("html2canvas")).default;

    const element = document.createElement("div");
    element.style.padding = "20px";
    element.style.fontFamily = "Arial, sans-serif";
    element.style.lineHeight = "1.6";
    element.style.color = "#333";
    element.style.backgroundColor = "white";

    // Add title
    if (title) {
      const titleEl = document.createElement("h1");
      titleEl.textContent = title;
      titleEl.style.marginBottom = "10px";
      titleEl.style.fontSize = "24px";
      titleEl.style.fontWeight = "bold";
      element.appendChild(titleEl);
    }

    // Add type and status metadata
    if (type || status) {
      const metaEl = document.createElement("p");
      metaEl.style.color = "#666";
      metaEl.style.fontSize = "12px";
      metaEl.style.marginBottom = "20px";
      metaEl.textContent = [type && `Type: ${type}`, status && `Status: ${status}`].filter(Boolean).join(" | ");
      element.appendChild(metaEl);
    }

    // Add content
    if (content) {
      const contentEl = document.createElement("div");
      let htmlContent = content;
      
      // If markdown format, convert markdown syntax to HTML
      if (contentFormat === "markdown") {
        htmlContent = content
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/__(.*?)__/g, "<u>$1</u>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>")
          .replace(/^### (.*?)$/gm, "<h3>$1</h3>")
          .replace(/^## (.*?)$/gm, "<h2>$1</h2>")
          .replace(/^# (.*?)$/gm, "<h1>$1</h1>")
          .replace(/\n\n/g, "</p><p>")
          .replace(/\n/g, "<br>");
        htmlContent = `<p>${htmlContent}</p>`;
      }
      
      contentEl.innerHTML = htmlContent;
      element.appendChild(contentEl);
    }

    // Append to body temporarily for rendering
    document.body.appendChild(element);

    // Convert element to canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    // Remove from DOM
    document.body.removeChild(element);

    // Create PDF
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    const pdf = new jsPDF("p", "mm", "a4");
    let position = 0;

    const imgData = canvas.toDataURL("image/png");

    while (heightLeft >= 0) {
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      position = heightLeft - imgHeight;
      if (heightLeft > 0) pdf.addPage();
    }

    pdf.save(`${title || "publication"}.pdf`);
  } catch (err: any) {
    console.error("PDF generation failed:", err);
    throw new Error("Failed to generate PDF");
  }
}
