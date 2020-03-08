import Outputter from './Outputter';

const fetch = require("node-fetch");

/**
 * Clean resource data to consolidate data for each host & resources
 *
 * @param {Array} data: array of objects - each being a resource requested
 *
 * @return {Object}: object with each host and it's resources requested
 */
const cleanData = (data) => {
  return data.reduce((proccessedData, resource) => {
    // ensure the current resource's host is tracked
    proccessedData[resource.host] = proccessedData[resource.host] || {
      resources: [],
      host: resource.host,
    };
    proccessedData[resource.host].resources.push({
      url: resource.url,
      size: resource.objectSize,
      downloadStart: resource.download_start,
      downloadEnd: resource.download_end,
      loadMS: resource.load_ms,
      ttfbMS: resource.ttfb_ms,
      contentType: resource.mimeType,
    });
    return proccessedData;
  }, {});
};

/**
 * Sorts a host's resources based on the resource size
 *
 * @param {Object} data: object of all the hosts and their resources
 */
const sortData = (data) => {
  Object.keys(data).forEach((key) => {
    // build hosts total resources
    data[key].totalResources = data[key].resources.reduce((total, current) => {
      return total + current.size;
    }, 0);
    // sort the resources
    data[key].resources.sort((a, b) => {
      return b.size - a.size;
    });
  });
};

const sortHosts = (data) => {
  return Object.values(data).sort((a, b) => {
    return b.totalResources - a.totalResources;
  })
};

/**
 * Get's the map of resourcing of the test run
 *
 * @param {Number} ID: ID of the test run
 */
const fetchMap = (ID, url) => {
  const URLToFetch = `http://requestmap.webperf.tools/download/${ID}/?server=webpagetest.org&download=0&format=json`;
  fetch(URLToFetch)
    .then((blob) => {
      if (!blob.ok) {
        throw Error(blob.statusText);
      }
      return blob.json();
    })
    .then((rawMapData) => {
      const mapData = cleanData(rawMapData);
      sortData(mapData);
      const sortedData = sortHosts(mapData);
      Outputter.outputFile(sortedData, url);
    })
    .catch(() => {
      console.log('waiting for "requestmap" to generate report...')
      setTimeout(() => { fetchMap(ID, url); }, 10000);
    });
};

export default {
  fetchMap,
  sortData,
  cleanData,
  sortHosts,
};
