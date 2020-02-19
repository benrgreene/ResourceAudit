const WebPageTest = require('webpagetest');
const fetch = require("node-fetch");

import Processor from './Process.js';
import Settings from './Settings.js';

const waitTime = 10000;

/**
 * checks every ten seconds if the speed test results are prepared
 *
 * @param {String} resultsURL: URL to check for test results
 * @param {String} url: URL we are running the test on
 */
const checkIfResultsPrepared = (resultsUL, url) => {
  fetch(resultsUL)
    .then((blob) => blob.json())
    .then((response) => {
      // if the results aren't prepared, then queue another check
      if (response.data &&
         (response.data.statusCode === 100 ||response.data.statusCode === 101)) {
        console.log(response.data.statusText);
        setTimeout(() => {
          checkIfResultsPrepared(resultsUL, url);
        }, waitTime);
      }
      // cool, now we parse the results
      else {
        const dataToProcess = response.data;
        Processor.process(dataToProcess, url);
      }
    })
    .catch((err) => console.log(err));
};

/**
 * Function description
 *
 * @param {String} url: URL we are running the test on
 */
const fetchSources = (url) => {
  const apiKey = Settings.getAPIKey();
  const wpt = new WebPageTest('www.webpagetest.org', apiKey);
  wpt.runTest(url, (err, response) => {
    if (response && response.statusCode === 200) {
      const responseURL = response.data.jsonUrl;
      checkIfResultsPrepared(responseURL, url);
    }
  });
};

export default {
  fetchSources,
};
