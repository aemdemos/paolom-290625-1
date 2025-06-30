/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must be a single cell (one column)
  const headerRow = ['Columns (columns9)'];
  // Get all direct child divs (columns in the grid)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, use the image if present, else the whole column
  const cells = columns.map(col => {
    // If the only child is an <img>, use it directly
    if (col.childElementCount === 1 && col.firstElementChild && col.firstElementChild.tagName === 'IMG') {
      return col.firstElementChild;
    }
    // If the only child is a wrapper with an img inside, use the img
    if (col.childElementCount === 1 && col.firstElementChild && col.firstElementChild.querySelector && col.firstElementChild.querySelector('img')) {
      const img = col.firstElementChild.querySelector('img');
      if (img) return img;
    }
    // Otherwise, return the whole column
    return col;
  });
  // Body row is a single row with each cell being a column
  const tableArray = [
    headerRow,
    cells
  ];
  const table = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(table);
}
