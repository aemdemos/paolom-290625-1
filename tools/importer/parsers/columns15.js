/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct column elements
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract content (usually an image)
  const contentRow = columnDivs.map((colDiv) => {
    const img = colDiv.querySelector('img');
    if (img) return img;
    return colDiv;
  });

  // Header row: one cell only, to span all columns (WebImporter will handle colspan)
  const headerRow = ['Columns (columns15)'];

  // Table structure: header, then content
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
