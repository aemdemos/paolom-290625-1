/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid that contains the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get the immediate children of the grid
  const gridChildren = Array.from(grid.children);

  // Group the left content (heading + subheading) and right content (buttons)
  // We'll keep each major group in its own cell per the example's expectations
  // Left column: group heading and subheading in one div
  const leftContainer = document.createElement('div');
  gridChildren.slice(0, 1).forEach((child) => leftContainer.appendChild(child));

  // Right column: group all buttons in another div
  const rightContainer = document.createElement('div');
  gridChildren.slice(1).forEach((child) => rightContainer.appendChild(child));

  // Prepare the block table
  const headerRow = ['Columns (columns18)'];
  const contentRow = [leftContainer, rightContainer];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
