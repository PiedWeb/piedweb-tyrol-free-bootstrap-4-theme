/**
 * List of all functions
 * - convertImgLinkToResponsiveImgLink(attribute)
 * - responsiveImage()
 */

/**
 * Transform link to image produce with Liip to responsive Link
 *
 * @param {string} attribute
 */
export function convertImgLinkToResponsiveImgLink(attribute = "data-rimg") {
  var test = [];
  if (typeof test.push === "function") {
    // to avoid gooogle bot execute
    [].forEach.call(document.querySelectorAll("[" + attribute + "]"), function(
      element
    ) {
      element.removeAttribute(attribute);
      var href = element.getAttribute(href);
      element.setAttribute(responsiveImage(href));
    });
  }
}

/**
 * Transform image's path (src) produce with Liip to responsive path
 *
 * @param {string} src
 */
export function responsiveImage(src) {
  if (block.clientWidth <= 576) {
    src = src.replace("/default/", "/xs/");
  } else if (block.clientWidth <= 768) {
    bg_src = src.replace("/default/", "/sm/");
  } else if (block.clientWidth <= 992) {
    bg_src = src.replace("/default/", "/md/");
  } else if (block.clientWidth <= 1200) {
    src = src.replace("/default/", "/lg/");
  } else {
    // 1200+
    src = src.replace("/default/", "/xl/");
  }

  return src;
}
