/* global WebImporter */
export default function parse(element, { document }) {
  // Find the column grid
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // There are 4 columns: 1 branding div, 3 navigation uls
  // Get the first child div (branding column)
  const branding = Array.from(grid.children).find(child => child.nodeName === 'DIV');
  // Get all ul columns (the menu columns)
  const uls = Array.from(grid.children).filter(child => child.nodeName === 'UL');
  // Only keep the first 3 columns as per the markdown example (branding, ul, ul)
  // But based on the HTML and example, we want columns: branding, first ul, second ul, third ul
  // So total three columns: branding div, first ul, second ul, third ul
  if (!branding || uls.length !== 3) return;
  const cells = [
    ['Columns (columns3)'],
    [branding, ...uls]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
