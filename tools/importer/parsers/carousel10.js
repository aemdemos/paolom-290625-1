/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the slides
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (each one contains an image)
  const slideDivs = Array.from(grid.children);

  // Header row as per the block name
  const rows = [['Carousel']];

  slideDivs.forEach((slideDiv) => {
    // Find the first <img> inside the slide
    const img = slideDiv.querySelector('img');
    if (!img) return; // Skip if there's no image
    // No text content for these slides, just image (first cell), empty text (second cell)
    rows.push([img, '']);
  });

  // Create and replace with the block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
