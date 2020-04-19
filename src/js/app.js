/**
 * Feel Free to copy this file in yourt app
 * /!\ You just need to change './helper.js' (line 21) to './node_modules/piedweb-tyrol-free-bootstrap-4-theme/src/js/helpers.js'
 * /!\ You just need to change './helper.js' (line 21) to './node_modules/piedweb-tyrol-free-bootstrap-4-theme/src/js/helpers-pwcms.js'
 */
/**
 * Import CSS
 */

import BootstrapCookieConsent from 'bootstrap-cookie-consent'

import baguetteBox from 'baguettebox.js'

import Macy from 'macy'

import {
  fixedNavBar,
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
} from './helpers.js'

require('../scss/main.scss')

var bsn = require('bootstrap.native/dist/bootstrap-native-v4')

document.addEventListener('DOMContentLoaded', function () {
  applyOnDomLoaded()
  /**/
  new BootstrapCookieConsent({
    services: ['StatistiquesAnonymes', 'YouTube'],
    services_descr: {
      StatistiquesAnonymes:
        "Nous permet d'améliorer le site en fonction de son utilisation",
      YouTube: 'Affiche les vidéos du service youtube.com'
    },
    method: 'bsn'
  })
  /**/

  addAClassOnScroll('.navbar', 'nostick', 50)
})

var gallery = function () {
  baguetteBox.run('.mimg', {
    captions: function (element) {
      return element.getElementsByTagName('img')[0].alt
    }
  })
}

function applyOnDomLoaded () {
  fixedNavBar()
  allClickable('.clickable')
  readableEmail('.cea')
  backgroundLazyLoad()
  imgLazyLoad()
  convertInLinks()
  convertInLinksFromRot13()
  applySmoothScroll()
  gallery()
  var masonry = new Macy({
    container: '#flex-masonry',
    columns: 3,
    margin: {
      y: 16,
      x: '2%'
    },
    breakAt: {
      992: 2,
      768: 1
    }
  })
}

function applyOnDomChanged () {
  gallery()
}

document.addEventListener('linksBuilt', applyOnDomChanged)

// var observer = new MutationObserver(applyOnDomChanged)
// observer.observe(document.body, { attributes: true, childList: true, subtree: true })
