/* global WebImporter */
export default function parse(element, { document }) {
  // Find main container
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // Main two-column content (headline vs. text/author/button)
  const mainGrid = container.querySelector('.grid-layout.tablet-1-column');
  if (!mainGrid) return;
  const mainCols = mainGrid.querySelectorAll(':scope > div');
  if (mainCols.length < 2) return;
  const leftCol = mainCols[0];
  const rightCol = mainCols[1];

  // Image grid (two images)
  const imagesGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  let imgCells = [];
  if (imagesGrid) {
    const imgDivs = imagesGrid.querySelectorAll(':scope > div');
    imgCells = Array.from(imgDivs).map(div => {
      const img = div.querySelector('img');
      return img || '';
    });
  }
  // Always two columns per row for this block; pad with empty if needed
  while (imgCells.length < 2) imgCells.push('');

  // Build table rows:
  // 1. Header (single cell)
  // 2. Main columns (left, right)
  // 3. Images (left, right)
  // The header row must be a single cell (array of length 1)
  const cells = [
    ['Columns (columns13)'],
    [leftCol, rightCol],
    imgCells
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}