import FetchMap from './FetchMap.js';

const getFullSizeOfHosts = (data) => {
  return data.reduce((totalSize, host) => {
    return totalSize + host.totalResources;
  }, 0);
};

const process = (data, url) => {
  FetchMap.fetchMap(data.id, url);
};

export default {
  process,
  getFullSizeOfHosts,
};
