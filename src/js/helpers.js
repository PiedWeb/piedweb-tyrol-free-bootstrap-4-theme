/**
 * List of all functions
 * - fixedNavBar()                       Add css class fixed-top to navbar
 * - imgLazyLoad(attribute)              Simple Image Lazy Loader
 * - backgroundLazyLoad(attribute, ...)  Add background to element wich have `attribute` (default data-bg)
 * - convertInLinks(attribute)           Convert elements wich contain attribute in normal link (a href)
 * - decodeToLink(attribute)             Convert elements wich contain attribute in rot13 in normal link (a href)
 * - convertInLinksFromRot13(attribute)  Convert elements wich contain attribute encoded in rot13 in normal link (a href)
 * - clickable(element)                  transform an element containing a link (a href) in a clickable element
 * - allClickable(selector)              transform all selected element in clickable element
 * - resizeWithScreenHeight(selector)
 * - wideImgCentered(selector)           center img used like background image
 * - smoothScroll(element)               Add a smooth effect during the scroll (not compatible with IE)
 * - rot13ToText(str)                    Decode rot13
 * - readableEmail(selector)             Transform an email encoded with rot13 in a readable mail (and add mailto:)
 * - applySmoothScroll()                 Add smoothscrolleffect on link in the dom wich are hash links
 * - addAClassOnScroll(selector,
 *                  classToAdd, delay)   Add a class on Scroll and remove it when it's in default position
 *
 */


// todo: how to set responsiveImage optionnal ?
import { responsiveImage } from "piedweb-cms-js-helpers/src/helpers.js";

export function fixedNavBar() {
  var navbar = document.getElementById("navbar");

  if (navbar && navbar.children[0]) {
    navbar.children[0].classList.add("fixed-top");
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
export function backgroundLazyLoad(
  attribute = "data-bg",
  overlay = "data-darken",
  position = "data-pos",
  darken = {
    center: "radial-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) )",
    inverse:
      "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3),  rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 1) )",
    default: "linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) )"
  }
) {
  var id = null;
  [].forEach.call(document.querySelectorAll("[" + attribute + "]"), function(
    block
  ) {
    var bg_src = block.dataset.bg;
    bg_src =
      "url('" +
      (typeof responsiveImage === "function"
        ? responsiveImage(bg_src)
        : bg_src) +
      "')";

    if (block.getAttribute(overlay)) {
      if (darken[block.getAttribute(overlay)] != undefined) {
        bg_src = darken[block.getAttribute(overlay)] + "," + bg_src;
      } else if (block.getAttribute(overlay) == 'true') {
        bg_src = darken['default'] + "," + bg_src;
      } else {
        bg_src = block.getAttribute(overlay) + bg_src;
      }
      block.removeAttribute(overlay);
    }

    console.log(block.getAttribute(position));
    bg_src += " " + (block.getAttribute(position) ? block.getAttribute(position) : 'no-repeat center center fixed');
    bg_src += ";background-size:cover";
    block.removeAttribute(position);
    block.removeAttribute("data-bg");
    block.setAttribute("style", "background:" + bg_src);
  });
}

/**
 * Simple Image Lazy Loader
 * original from : https://davidwalsh.name/lazyload-image-fade
 *
 * @param {string}  attribute
 *
 * @example
 * imgLazyLoad()
 * <span data-img=/img/me.png>Tagada</span> or <img data-img=/img/me.png alt=Tagada>
 *
 * will be converted to
 *
 * <img src=/img/me.png alt=Tagada />
 */
export function imgLazyLoad(attribute = "data-img") {
  [].forEach.call(document.querySelectorAll("[" + attribute + "]"), function(
    img
  ) {
    var newDomImg = document.createElement("img");
    var src = img.getAttribute(attribute);
    img.removeAttribute(attribute);
    for (var i = 0, n = img.attributes.length; i < n; i++) {
      newDomImg.setAttribute(
        img.attributes[i].nodeName,
        img.attributes[i].nodeValue
      );
    }
    if (newDomImg.getAttribute("alt") === null && img.textContent != "") {
      newDomImg.setAttribute("alt", img.textContent);
    }
    newDomImg.setAttribute(
      "src",
      typeof responsiveImage === "function" ? responsiveImage(src) : src
    );
    img.outerHTML = newDomImg.outerHTML;
  });
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
export function addAClassOnScroll(selector, classToAdd, delay = 10) {
  var element = document.querySelector(selector);
  if (element !== null) {
    window.onscroll = function() {
      if (pageYOffset > delay) {
        if (element.className.indexOf(classToAdd) < 0) {
          element.classList.add(classToAdd);
        }
      } else {
        element.classList.remove(classToAdd);
      }
    };
  }
}

/**
 * Convert elements wich contain attribute in normal link (a href)
 * Except for old Browser (like google bot)
 *
 * @param {string}  attribute
 *
 * @example
 * convertInLinks()
 * <span data-href=/img/me.png>Tagada</span> => <a href="/img/me.png">Tagada</a>
 */
export function convertInLinks(attribute = "data-href") {
  var test = [];
  if (typeof test.push === "function") {
    // to avoid gooogle bot execute
    [].forEach.call(document.querySelectorAll("[" + attribute + "]"), function(
      element
    ) {
      var link = document.createElement("a");
      var href = element.getAttribute(attribute);
      element.removeAttribute(attribute);
      for (var i = 0, n = element.attributes.length; i < n; i++) {
        link.setAttribute(
          element.attributes[i].nodeName,
          element.attributes[i].nodeValue
        );
      }
      link.textContent = element.textContent;
      link.setAttribute("href", href);
      element.outerHTML = link.outerHTML;
    });
  }
}

/**
 * Convert elements wich contain attribute encoded in rot13 in normal link (a href)
 * first character can be a shortcut for http:// (-), https:// (_), mailto: (@)
 * Except for old Browser (like google bot)
 *
 * @param {string}  attribute
 */
export function convertInLinksFromRot13(attribute = "data-rot") {
  var test = [];
  if (typeof test.push === "function") {
    // to avoid gooogle bot execute
    [].forEach.call(document.querySelectorAll("[" + attribute + "]"), function(
      element
    ) {
      var link = document.createElement("a");
      var href = element.getAttribute(attribute);
      element.removeAttribute(attribute);
      for (var i = 0, n = element.attributes.length; i < n; i++) {
        link.setAttribute(
          element.attributes[i].nodeName,
          element.attributes[i].nodeValue
        );
      }
      link.textContent = element.textContent;
      link.setAttribute("href", convertShortchutForLink(rot13ToText(href)));
      element.outerHTML = link.outerHTML;
    });
  }
}

export function convertShortchutForLink(str) {
  if (str.charAt(0) == "-") {
    return str.replace("-", "http://");
  }
  if (str.charAt(0) == "_") {
    return str.replace("_", "https://");
  }
  if (str.charAt(0) == "@") {
    return str.replace("@", "mailto:");
  }
}

/**
 * transform an element containing a link (a href) in a clickable element
 *
 * @param {Object}  element
 */
export function clickable(element) {
  if (!element.querySelector("a")) return false;
  var link = element.querySelectorAll("a")[0];
  if (
    window.location.pathname.replace(/^\//, "") ==
      link.pathname.replace(/^\//, "") &&
    window.location.hostname == link.hostname
  ) {
    if (typeof smoothScroll === "function") {
      smoothScroll(link);
    }
    return false;
  }
  window.location =
    link.getAttribute("href") === null ? "" : link.getAttribute("href");
  return false;
}

/**
 * allClickable(selector) transform all selected element in clickable element
 *
 * @param {string}  selector
 */
export function allClickable(selector) {
  document.querySelectorAll(selector).forEach(function(item) {
    item.addEventListener("click", function() {
      clickable(item);
    });
  });
}

/**
 * resize with screen height
 *
 * @param {string}  selector
 */
export function resizeWithScreenHeight(selector) {
  if (document.querySelector(selector) !== null)
    document.querySelector(selector).style.height = window.innerHeight + "px";
}

/**
 * wideImgCentered(selector)    center img used like background image
 *
 * @param {string}  selector
 */
export function wideImgCentered(selector) {
  if (document.querySelector(selector) !== null) {
    var img = document.querySelector(selector);
    if (img === null) return;
    var container = img.parentNode;
    if (img.height > container.clientHeight) {
      var divide = img.height / container.clientHeight;
      console.log(divide);
      if (divide >= 4) {
        img.style.transform = "translate(0%, -50%)";
      } else if (divide >= 2) {
        img.style.transform = "translate(0, -25%)";
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
export function smoothScroll(link, event = null) {
  if (
    location.pathname.replace(/^\//, "") == link.pathname.replace(/^\//, "") &&
    location.hostname == link.hostname &&
    link.hash != ""
  ) {
    var target = document.querySelector(link.hash);
    target =
      target !== null
        ? target
        : document.querySelector("[name=" + link.hash.slice(1) + "]");
    if (target !== null) {
      if (event !== null) event.preventDefault();
      window.scrollTo({
        behavior: "smooth",
        left: 0,
        top: target.offsetTop
      });
    }
  }
}

/**
 * applySmoothScroll() Add smoothscrolleffect on link in the dom wich are hash links
 */
export function applySmoothScroll() {
  document.querySelectorAll('[href*="#"]').forEach(function(item) {
    item.addEventListener("click", function(event) {
      smoothScroll(item, event);
    });
  });
}

/**
 * Decode rot13
 *
 * @param {string}  str
 */
export function rot13ToText(str) {
  return str.replace(/[a-zA-Z]/g, function(c) {
    return String.fromCharCode(
      (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
    );
  });
}

/**
 * readableEmail(selector) Transform an email encoded with rot13 in a readable mail (and add mailto:)
 *
 * @param {string}  text
 */
export function readableEmail(selector) {
  let block = document.querySelector(selector);
  if (block !== null) {
    var mail = rot13ToText(block.textContent);
    block.innerHTML = '<a href="mailto:' + mail + '">' + mail + "</a>";
  }
}
