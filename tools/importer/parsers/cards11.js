/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row, matches exactly: Cards (cards11)
  const headerRow = ['Cards (cards11)'];

  // Each card is a top-level >div (flex-horizontal)
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [];

  cardDivs.forEach(card => {
    // Icon: the first <svg> within .icon
    const iconDiv = card.querySelector('.icon');
    let iconEl = null;
    if (iconDiv && iconDiv.firstElementChild) {
      iconEl = iconDiv.firstElementChild;
    }
    // Text: the first <p> (should always exist, but fallback to empty if not)
    const p = card.querySelector('p') || document.createElement('p');
    rows.push([iconEl, p]);
  });

  // Compose cells: header + all card rows
  const cells = [headerRow, ...rows];
  
  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
