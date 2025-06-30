/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards6)'];
  // Gather all direct child <a> elements = cards
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = cards.map(card => {
    // Image cell
    const img = card.querySelector('img');
    // Text cell:
    // Find the block containing all text content
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    // We'll collect references to the actual text elements in a fragment
    const textElements = [];
    // Tag (if exists)
    const tagGroup = textContainer ? textContainer.querySelector('.tag-group') : null;
    if (tagGroup) {
      textElements.push(tagGroup);
    }
    // Title (h3)
    const heading = textContainer ? textContainer.querySelector('h3') : null;
    if (heading) {
      textElements.push(heading);
    }
    // Description (p)
    const desc = textContainer ? textContainer.querySelector('p') : null;
    if (desc) {
      textElements.push(desc);
    }
    // Card link as CTA only if href is NOT '/' (since '/' is a general homepage)
    const href = card.getAttribute('href');
    if (href && href !== '/') {
      // For semantic clarity, use the actual <a> for CTA if it is not the root link
      // But since the entire card is a link, and example does not include CTA separately, skip adding CTA
      // If in the future a CTA must be rendered, here is where it would go
    }
    // Return row with [image, ...text]
    return [img, textElements];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
