/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell with the block name, matching the markdown example
  const headerRow = ['Cards (cards5)'];
  const rows = [headerRow];

  // Each card is a direct child div with an img inside. There is no text content in this sample HTML.
  const cards = element.querySelectorAll(':scope > div');
  cards.forEach(cardDiv => {
    // Get the image element
    const img = cardDiv.querySelector('img');
    // Card row: image in first cell, second cell must be present (empty string if no text)
    rows.push([img, '']);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element with the new table
  element.replaceWith(table);
}
