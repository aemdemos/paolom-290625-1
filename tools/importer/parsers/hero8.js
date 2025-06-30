/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header
  const headerRow = ['Hero (hero8)'];

  // 2. Find the grid parent, get both columns
  const grid = element.querySelector('.grid-layout');
  const gridChildren = grid ? grid.querySelectorAll(':scope > div') : [];

  // 3. First column: background image (row 2)
  let imageEl = '';
  if (gridChildren.length > 0) {
    // Find the first image in this column
    const possibleImg = gridChildren[0].querySelector('img');
    if (possibleImg) imageEl = possibleImg;
  }

  // 4. Second column: text content (row 3)
  let contentCell = '';
  if (gridChildren.length > 1) {
    // The inner grid with content
    const contentGrid = gridChildren[1].querySelector('.w-layout-grid');
    if (contentGrid) {
      // Create a container to hold everything in order
      const contentContainer = document.createElement('div');
      // Heading (h1)
      const h1 = contentGrid.querySelector('h1');
      if (h1) contentContainer.appendChild(h1);
      // Paragraph(s) and button(s) in flex-vertical
      const flexV = contentGrid.querySelector('.flex-vertical');
      if (flexV) {
        flexV.childNodes.forEach(child => {
          // Only append elements, skip text nodes (formatting)
          if (child.nodeType === 1) contentContainer.appendChild(child);
        });
      }
      contentCell = contentContainer;
    }
  }

  // 5. Build and replace block table
  const rows = [
    headerRow,
    [imageEl],
    [contentCell],
  ];
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
