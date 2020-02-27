import FetchMap from './FetchMap.js';
import Images from './Images.js';

const getFullSizeOfHosts = (data) => {
  return data.reduce((totalSize, host) => {
    return totalSize + host.totalResources;
  }, 0);
};

const process = (data, url) => {
  FetchMap.fetchMap(data.id, url);
  Images.auditImages(data, url);
};

export default {
  process,
  getFullSizeOfHosts,
};
