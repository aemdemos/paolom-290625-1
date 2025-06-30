/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards14) block header
  const rows = [['Cards (cards14)']];

  // Get all direct child <a> elements (cards)
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');

  cards.forEach(card => {
    // First cell: image (grab the <img> inside the .utility-aspect-2x3 wrapper)
    let imageCell = null;
    const imageWrapper = card.querySelector('.utility-aspect-2x3');
    if (imageWrapper) {
      const img = imageWrapper.querySelector('img');
      if (img) imageCell = img;
    }

    // Second cell: text content
    const textCell = document.createElement('div');
    // Add tag and date if they exist
    const headerGroup = card.querySelector('.flex-horizontal');
    if (headerGroup) {
      const tag = headerGroup.querySelector('.tag');
      if (tag) textCell.appendChild(tag);
      const date = headerGroup.querySelector('.paragraph-sm');
      if (date) textCell.appendChild(date);
    }
    // Add the heading (title)
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) textCell.appendChild(heading);
    // (No description or CTA in the provided HTML)

    // Add the row to the table
    rows.push([imageCell, textCell]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
