import Cookies from './Cookies.js';

/**
 * Audits the images of a page
 *
 * @param {Object} data: the data returned from a WebTestPage test
 * @param {String} url: the URL of the page being audited
 */
const auditImages = (data, url) => {
  const images = JSON.parse(data.median.firstView.Images);
  // get the ratio of natural image size to displayed size
  images.forEach((image) => {
    image.widthRatio = image.naturalWidth / image.width;
  });
  // sort by width ratio
  images.sort((a, b) => b.widthRatio - a.widthRatio);
  // save to file for retrieval later
  Cookies.saveCookie(
    Cookies.storageSettings.imageCookie,
    JSON.stringify(images)
  );
};


export default {
  auditImages,
};
