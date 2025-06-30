/* global WebImporter */
export default function parse(element, { document }) {
  // Header row from the example
  const headerRow = ['Cards (cards16)'];
  // Each immediate child <a> is a card
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = [headerRow];

  cards.forEach((card) => {
    // First cell: first <img> inside the card (reference existing element)
    const img = card.querySelector('img');

    // Second cell: all content except the image
    // Get the inner grid or content container
    const outerGrid = card.querySelector(':scope > div');
    let textBlock = null;
    if (outerGrid) {
      // Find the first div that is NOT a grid-layout (we want the content wrapper)
      const contentDiv = Array.from(outerGrid.children).find(
        (child) => child.tagName === 'DIV'
      );
      if (contentDiv) {
        // Remove the 'Read' at the bottom as a duplicate CTA if exists at the end
        const readDiv = Array.from(contentDiv.children).find(
          el => el.textContent.trim() === 'Read' && el.tagName === 'DIV'
        );
        if (readDiv) readDiv.remove();
        // Compose the text block with all content
        const textNodes = [];
        // Tag row
        const tagRow = contentDiv.querySelector('.flex-horizontal, .align-center, .flex-gap-xs, .utility-margin-bottom-1rem');
        if (tagRow) textNodes.push(tagRow);
        // Heading
        const heading = contentDiv.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) textNodes.push(heading);
        // Paragraph
        const paragraph = contentDiv.querySelector('p');
        if (paragraph) textNodes.push(paragraph);
        // CTA (as a link with the href from parent <a>)
        if (card.href) {
          const link = document.createElement('a');
          link.href = card.href;
          link.textContent = 'Read';
          textNodes.push(link);
        }
        textBlock = textNodes;
      }
    }
    // Fallback: if we couldn't find the content div, fallback to outer grid children (excluding img)
    if (!textBlock || textBlock.length === 0) {
      textBlock = Array.from(outerGrid.childNodes).filter(node => node !== img);
    }
    rows.push([
      img,
      textBlock
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
