/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the block table rows array, starting with header
  const rows = [['Accordion']];

  // Select all immediate accordion items
  const accordionItems = element.querySelectorAll(':scope > .accordion');

  accordionItems.forEach((item) => {
    // Grab the title from .w-dropdown-toggle > .paragraph-lg
    let titleEl = '';
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      const paragraphLg = toggle.querySelector('.paragraph-lg');
      if (paragraphLg) titleEl = paragraphLg;
    }
    // Grab the content from .accordion-content (nav)
    let contentCell = '';
    const contentNav = item.querySelector('.accordion-content');
    if (contentNav) {
      // If there's utility-padding... inside, use its contents
      const pad = contentNav.querySelector('.utility-padding-all-1rem');
      if (pad && pad.childNodes.length === 1 && pad.firstChild.nodeType === 1) {
        // If only the rich text is inside, just use that element
        contentCell = pad.firstChild;
      } else if (pad) {
        // Use all pad children if more complex
        contentCell = Array.from(pad.childNodes);
      } else {
        // Fallback: use all contentNav children
        contentCell = Array.from(contentNav.childNodes);
      }
    }
    rows.push([titleEl, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
