/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: block name
  const headerRow = ['Hero (hero17)'];

  // 2. Extract background image (img in left grid cell)
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  for (const div of gridDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }

  // 3. Extract content cell: the grid cell with the title and CTA
  // We'll reference the .utility-margin-bottom-6rem div if possible, else fallback to the 'container' div
  let contentCell = null;
  let contentFound = false;
  for (const div of gridDivs) {
    if (div.classList.contains('container')) {
      const inner = div.querySelector('.utility-margin-bottom-6rem');
      if (inner) {
        contentCell = inner;
        contentFound = true;
      } else {
        contentCell = div;
        contentFound = true;
      }
      break;
    }
  }
  if (!contentFound) {
    // fallback: blank cell if not found
    contentCell = '';
  }

  // 4. Compose the table rows as specified: header, background image, content
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
