/**
 * Page dynamics module handling scroll, header effects, and animations.
 * @module page-dynamics
 */

import { $, $$ } from './utils.js'

/**
 * Initialize dynamic page behaviors including header effects, smooth scrolling, and animations.
 */
export const init = () => initPageDynamics();

/**
 * Initialize all dynamic page behaviors.
 */
function initPageDynamics() {
  initHeader();
  initAnchorScrolling();
}

/**
 * Initialize sticky header behavior based on scroll position.
 */
function initHeader() {
  const hero = $('#hero');
  const header = $('#header');

  window.addEventListener('scroll', onScroll);

  function onScroll() {
    const sticky = isSticky();
    const isSet = header.classList.contains('Sticky');
    if (sticky && !isSet)
      header.classList.add('Sticky');
    else if (!sticky && isSet)
      header.classList.remove('Sticky');
  }

  function isSticky() {
    const trigger = hero.offsetTop + Math.trunc(hero.offsetHeight / 4);
    return window.scrollY > trigger;
  }
}

/**
 * Initialize smooth scrolling for anchor links.
 */
function initAnchorScrolling() {
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', onClick));

  function onClick(e) {
    e.preventDefault();
    const target = $(this.getAttribute('href'));
    if (target) {
      const targetTop = target.getBoundingClientRect().top + window.scrollY - 50;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  }
}
