/**
 * Galleries page module that assembles carousels and photo data.
 * @module page-galleries
 */

import { $, $$ } from './utils.js'
import { Carousel } from './Carousel.js'
import { Website } from './Website.js'
import { PhotoCatalog } from './PhotoCatalog.js'

/**
 * Initialize the galleries page functionality.
 * Sets up photo galleries with carousels for each gallery section.
 */
export const init = () => initGalleries();

/**
 * Initialize all galleries on the page by setting up carousels for each.
 */
function initGalleries() {
  $$('.Gallery').forEach(g => initGallery(g, PhotoCatalog.byGallery[g.id]));
}

/**
 * Initialize a single gallery with a carousel and slides from photos.
 * @param {HTMLElement} gallery - The gallery DOM element
 * @param {Array} photos - Array of photo URLs for the gallery
 */
function initGallery(gallery, photos) {
  const gid = gallery.id;
  const cid = `#${gid} .Carousel`;
  const carouselDiv = $(cid, gallery);
  const containerDiv = $('.CarouselContainer', carouselDiv);
  const indicatorsDiv = $('.CarouselIndicators', carouselDiv);

  let ndx = 0;
  photos.forEach(photo => createSlide(photo, ndx++));

  const carousel = new Carousel(cid, true).init(false);
  Website.the.galleries[gid] = { gallery, carousel };

  if ('IntersectionObserver' in window) {
    const pause = e => e.isIntersecting ? carousel.unpause() : carousel.pause();
    const observing = all => all.forEach(e => pause(e));
    new IntersectionObserver(observing, { threshold: 0.25 }).observe(carouselDiv);
  }

  function createSlide(photo, ndx) {
    const slide = document.createElement('div');
    slide.className = 'CarouselSlide';
    slide.appendChild(createImage(photo));
    containerDiv.appendChild(slide);
    indicatorsDiv.appendChild(createDot(ndx));
  }

  function createImage(photo) {
    const img = document.createElement('img');
    img.className = 'Photo';
    img.src = photo;
    img.alt = 'swarmAg';
    img.loading = 'lazy';
    img.addEventListener('load', () => img.classList.add('loaded'));
    return img;
  }

  function createDot(ndx) {
    const dot = document.createElement('button');
    dot.className = 'CarouselDot';
    dot.role = 'tab';
    dot.setAttribute('aria-label', `${ndx + 1}`);
    dot.tabIndex = 0;
    return dot;
  }
}
