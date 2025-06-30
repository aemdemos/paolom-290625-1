/* global WebImporter */
export default function parse(element, { document }) {
  // Find the active tab pane (first one with .w--tab-active)
  const activePane = element.querySelector('.w-tab-pane.w--tab-active');
  if (!activePane) return;
  // The content for the hero is in a grid inside the tab pane
  const grid = activePane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid - preserve their order
  const children = Array.from(grid.children);
  let img = null;
  const textElements = [];

  // Separate image(s) from text content, keep ALL text content as elements
  children.forEach(child => {
    if (child.tagName === 'IMG') {
      img = child;
    } else if (child.textContent && child.textContent.trim().length > 0) {
      textElements.push(child);
    }
  });

  // Compose rows as per the example:
  // 1. Header
  // 2. Image (background image)
  // 3. All text content (title, subheading, etc. -- as elements, in order)
  const rows = [];
  rows.push(['Hero (hero1)']);
  rows.push([img ? img : '']);
  // Always supply an array to preserve order and include all text content
  rows.push([textElements.length === 1 ? textElements[0] : textElements]);

  // Create the table and replace the original block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
