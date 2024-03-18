/**
 * Create the template with HTML to nest it to the bundle
 *
 * @param {string} stringWithHTML - string containing HTML from another index.js component
 *                                  or directly imported .html file
 * @returns {object} - returns the template (#document-fragment) with HTML inside
 *
 * @example
 *  in the index.(js | ts) file to implement component logic:
 *   import { htmlCreateComponentHelper } from
 *   'projectName/src/shared/utilities/htmlCreateComponent/htmlCreateComponentHelper.js';
 *
 *   import footerHtmlTemplate from './footer.html';
 *
 *   // project global styles
 *   import '../../index.scss';
 *
 *   const footerHTMLSection = htmlCreateComponentHelper(footerHtmlTemplate);
 *
 *   export { footerHTMLSection };
 */

export default function htmlCreateComponentHelper(stringWithHTML) {
  /** @param {string} template */
  const template = document.createElement('template');
  template.innerHTML = stringWithHTML;
  /** @param {object} template.content */
  return template.content;
}
