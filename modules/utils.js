/**
 * Select a single DOM element using a CSS selector.
 * @param {string} selector - CSS selector string
 * @param {Element} [node=document] - Root element to search within
 * @returns {Element|null} The first matching element or null if not found
 */
export const $ = (selector, node = document) => node.querySelector(selector);

/**
 * Select multiple DOM elements using a CSS selector.
 * @param {string} selector - CSS selector string
 * @param {Element} [node=document] - Root element to search within
 * @returns {NodeList} A NodeList of matching elements
 */
export const $$ = (selector, node = document) => node.querySelectorAll(selector);

/**
 * Create an immutable (frozen) copy of an object.
 * @param {Object} o - The object to freeze
 * @returns {Object} The frozen object
 */
export const immutable = o => Object.freeze(o);

/**
 * Randomly shuffles an array and returns a subset of the specified maximum length.
 * @param {Array} a - The array to shuffle and slice
 * @param {number} [max] - Maximum number of elements to return. If not provided, returns all elements.
 * @returns {Array} A randomly shuffled subset of the input array
 */
export const shuffle = (a, max) => {
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, max ?? a.length);
};
