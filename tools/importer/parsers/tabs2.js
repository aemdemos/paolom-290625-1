/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child <a> elements (these are the tabs)
  const tabs = Array.from(element.querySelectorAll(':scope > a'));

  // Build rows: first row is a single cell header, as in the example
  const cells = [ ['Tabs'] ];

  // Each subsequent row: [label, content], content = '' (not available in given html)
  tabs.forEach((tab) => {
    let label = tab.querySelector('div') || tab;
    cells.push([label, '']);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}