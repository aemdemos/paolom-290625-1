/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header must match the block name exactly
  const headerRow = ['Hero (hero7)'];
  
  // 2. Background: all images in the collage (second grid)
  let backgroundCell = '';
  // Find the grid containing the images
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  if (grid) {
    const imgs = Array.from(grid.querySelectorAll('img.cover-image'));
    if (imgs.length === 1) {
      backgroundCell = imgs[0];
    } else if (imgs.length > 1) {
      // Group all images into a wrapper for background
      const wrapper = document.createElement('div');
      imgs.forEach(img => wrapper.appendChild(img));
      backgroundCell = wrapper;
    }
  }

  // 3. Content: headline (h1), subheading (p.subheading), CTAs (button-group)
  let contentCell = '';
  const contentCol = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (contentCol) {
    // Find the inner container (contains all text and ctas)
    const container = contentCol.querySelector('.container') || contentCol;
    // for robustness, gather h1, subheading p, and button-group in order
    const parts = [];
    const h1 = container.querySelector('h1');
    if (h1) parts.push(h1);
    const subheading = container.querySelector('p.subheading');
    if (subheading) parts.push(subheading);
    const buttonGroup = container.querySelector('.button-group');
    if (buttonGroup) parts.push(buttonGroup);
    if (parts.length > 0) {
      const wrap = document.createElement('div');
      parts.forEach(p=>wrap.appendChild(p));
      contentCell = wrap;
    } else {
      contentCell = container;
    }
  }

  // Compose table rows
  const rows = [
    headerRow,
    [backgroundCell],
    [contentCell]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
