/**
 * List of all functions
 * - fixedNavBar()                       Add css class fixed-top to navbar
 * - backgroundLazyLoad(attribute, ...)  Add background to element wich have `attribute` (default data-bg)
 * - clickable(element)                  transform an element containing a link (a href) in a clickable element
 * - allClickable(selector)              transform all selected element in clickable element
 * - resizeWithScreenHeight(selector)
 * - wideImgCentered(selector)           center img used like background image
 * - smoothScroll(element)               Add a smooth effect during the scroll (not compatible with IE)
 * - applySmoothScroll()                 Add smoothscrolleffect on link in the dom wich are hash links
 * - addAClassOnScroll(selector,
 *                  classToAdd, delay)   Add a class on Scroll and remove it when it's in default position
 */

// todo: how to set responsiveImage optionnal ?
import { testWebPSupport } from 'piedweb-cms-js-helpers/src/helpers.js'

export function fixedNavBar () {
  var navbar = document.getElementById('navbar')

  if (navbar && navbar.children[0]) {
    navbar.children[0].classList.add('fixed-top') 
  }
}

/**
 * backgroundLazyLoad() Add background to element wich have `attribute` (default data-bg)
 *
 * @param {string}  attribute
 * @param {string}  overlay     attribute containing one of value contained in darken or the css value
 * @param {string}  position    attribute containing the css position else "no repeat center center fixed"
 * @param {array}   darken      default : linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) )
 */
export function backgroundLazyLoad (
  applyOnImageSrc = function (src) { return src; },
  attribute = 'data-bg',
  overlay = 'data-darken',
  position = 'data-pos',
  darken = {
    center: 'radial-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) )',
    inverse:
      'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0),  rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 1) )',
    default: 'linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) )'
  }
) {
  function rgb2hex (rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    function hex (x) {
      return ('0' + parseInt(x).toString(16)).slice(-2)
    }
    return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3])
  }

  var id = null;

  [].forEach.call(document.querySelectorAll('[' + attribute + ']'), function (
    block
  ) {
    if (
      window.location.hash &&
      block.getAttribute(attribute + '_' + window.location.hash.substring(1))
    ) {
      var src = block.getAttribute(
        attribute
            + (testWebPSupport() && block.getAttribute(attribute+'-webp'+'_' + window.location.hash.substring(1)) ? '-webp' : '')
            + '_' + window.location.hash.substring(1)
      )
      var srcset = block.getAttribute(
        attribute + '_' + window.location.hash.substring(1)
      )
      block.removeAttribute(
        attribute + '_' + window.location.hash.substring(1)
      )

      if (block.querySelector('.d-md-none img')) {
        block.querySelector('.d-md-none source').setAttribute('srcset', applyOnImageSrc(src))
        block.querySelector('.d-md-none img').setAttribute('srcset', applyOnImageSrc(srcset))
        block
          .querySelector('.d-md-none img')
          .setAttribute('src', src)
      }
      var bg_color = '' // default color... better than weird color... may implement https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
    } else {
      var src = testWebPSupport() && block.getAttribute(attribute+'-webp') ? block.getAttribute(attribute+'-webp')
        : block.getAttribute(attribute) // block.dataset.bg;
      var bg_color = block.style.backgroundColor
        ? rgb2hex(block.style.backgroundColor)
        : ''
    }

    var bg_src = bg_color + " url('" + applyOnImageSrc(src) + "')"

    if (block.getAttribute(overlay)) {
      if (darken[block.getAttribute(overlay)] != undefined) {
        bg_src = darken[block.getAttribute(overlay)] + ',' + bg_src
      } else if (block.getAttribute(overlay) == 'true') {
        bg_src = darken.default + ',' + bg_src
      } else if (
        block.getAttribute(overlay) &&
        block.getAttribute(overlay) != ' '
      ) {
        bg_src = block.getAttribute(overlay) + ',' + bg_src
      }
      block.removeAttribute(overlay)
    }
    bg_src +=
      ' ' +
      (block.getAttribute(position)
        ? block.getAttribute(position)
        : 'no-repeat center center fixed')
    block.removeAttribute(position)
    block.removeAttribute(attribute)
    block.setAttribute(
      'style',
      'background:' + bg_src + ';background-size:cover'
    )
  })
}

/**
 * Add a class on Scroll and remove it when it's in default position
 *
 * @param {string}  selector    the selector wich give us the object to modify
 * @param {integer} delay       the number of pixel before to add it
 * @param {string}  classToAdd  the class wich will be added
 *
 * @exemple
 * addAClassOnScroll('.navbar', 'nostick', 50)
 */
export function addAClassOnScroll (selector, classToAdd, delay = 10) {
  var element = document.querySelector(selector)
  if (element !== null) {
    window.onscroll = function () {
      if (pageYOffset > delay) {
        if (element.className.indexOf(classToAdd) < 0) {
          element.classList.add(classToAdd)
        }
      } else {
        element.classList.remove(classToAdd)
      }
    }
  }
}

/**
 * transform an element containing a link (a href) in a clickable element
 *
 * @param {Object}  element
 */
export function clickable (element) {
  if (!element.querySelector('a')) return false
  var link = element.querySelectorAll('a')[0]
  if (
    window.location.pathname.replace(/^\//, '') ==
      link.pathname.replace(/^\//, '') &&
    window.location.hostname == link.hostname
  ) {
    if (typeof smoothScroll === 'function') {
      smoothScroll(link)
    }
    return false
  }
  window.location =
    link.getAttribute('href') === null ? '' : link.getAttribute('href')
  return false
}

/**
 * allClickable(selector) transform all selected element in clickable element
 *
 * @param {string}  selector
 */
export function allClickable (selector) {
  document.querySelectorAll(selector).forEach(function (item) {
    item.addEventListener('click', function () {
      clickable(item)
    })
  })
}

/**
 * resize with screen height
 *
 * @param {string}  selector
 */
export function resizeWithScreenHeight (selector) {
  if (document.querySelector(selector) !== null) { document.querySelector(selector).style.height = window.innerHeight + 'px' }
}

/**
 * wideImgCentered(selector)    center img used like background image
 *
 * @param {string}  selector
 */
export function wideImgCentered (selector) {
  if (document.querySelector(selector) !== null) {
    var img = document.querySelector(selector)
    if (img === null) return
    var container = img.parentNode
    if (img.height > container.clientHeight) {
      var divide = img.height / container.clientHeight
      if (divide >= 4) {
        img.style.transform = 'translate(0%, -50%)'
      } else if (divide >= 2) {
        img.style.transform = 'translate(0, -25%)'
      }
    }
  }
}

/**
 * smoothScroll(element)        Add a smooth effect during the scroll
 * Not working with IE but not worst than https://bundlephobia.com/result?p=smooth-scroll@15.0.0 ?
 *
 * @param {Object}  link
 */
export function smoothScroll (link, event = null) {
  if (
    location.pathname.replace(/^\//, '') == link.pathname.replace(/^\//, '') &&
    location.hostname == link.hostname &&
    link.hash != ''
  ) {
    var target = document.querySelector(link.hash)
    target =
      target !== null
        ? target
        : document.querySelector('[name=' + link.hash.slice(1) + ']')
    if (target !== null) {
      if (event !== null) event.preventDefault()
      window.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: target.offsetTop
      })
    }
  }
}

/**
 * applySmoothScroll() Add smoothscrolleffect on link in the dom wich are hash links
 */
export function applySmoothScroll () {
  document.querySelectorAll('[href*="#"]').forEach(function (item) {
    item.addEventListener('click', function (event) {
      smoothScroll(item, event)
    })
  })
}

