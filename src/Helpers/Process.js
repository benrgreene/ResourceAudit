import FetchMap from './FetchMap.js';
import Images from './Images.js';

const process = (data, url) => {
  Images.auditImages(data, url);
  FetchMap.fetchMap(data.id, url);
};

export default {
  process,
};
