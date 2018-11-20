/**
 * Feel Free to copy this file in yourt app
 * /!\ You just need to change './helper.js' (line 21) to './node_modules/piedweb-tyrol-free-bootstrap-4-theme/src/js/helpers.js'
 * /!\ You just need to change './helper.js' (line 21) to './node_modules/piedweb-tyrol-free-bootstrap-4-theme/src/js/helpers-pwcms.js'
 */
/**
 * Import CSS
 */
require("../scss/main.scss");

import BootstrapCookieConsent from "bootstrap-cookie-consent";

import baguetteBox from "baguettebox.js";

var bsn = require("bootstrap.native/dist/bootstrap-native-v4");

import {
  convertImgLinkToResponsiveImgLink,
  responsiveImage
} from "./helpers-pwcms.js";

import {
  imgLazyLoad,
  backgroundLazyLoad,
  convertInLinks,
  convertInLinksFromRot13,
  clickable,
  resizeWithScreenHeight,
  wideImgCentered,
  smoothScroll,
  rot13ToText,
  readableEmail,
  applySmoothScroll,
  addAClassOnScroll,
  allClickable
} from "./helpers.js";

document.addEventListener("DOMContentLoaded", function() {
  applyOnDomLoaded();
  /**/
  new BootstrapCookieConsent({
    services: ["StatistiquesAnonymes", "YouTube"],
    services_descr: {
      StatistiquesAnonymes:
        "Nous permet d'améliorer le site en fonction de son utilisation",
      YouTube: "Affiche les vidéos du service youtube.com"
    },
    method: "bsn"
  });
  /**/

  addAClassOnScroll(".navbar", "nostick", 50);
});

function applyOnDomLoaded() {
  allClickable(".clickable");
  imgLazyLoad();
  readableEmail(".cea");
  backgroundLazyLoad();
  convertInLinks();
  applySmoothScroll();
  baguetteBox.run(".mimg", {
    captions: function(element) {
      return element.getElementsByTagName("img")[0].alt;
    }
  });
}
