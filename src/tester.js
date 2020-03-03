import Outputter from './Helpers/Outputter';

// functions for testing
import FetchMapping from './Helpers/FetchMap';
import Images from './Helpers/Images.js';

// test data
import sortTest from './TestData/SortData.js';
import imageTest from './TestData/images.js';

const testInput = () => {
  Images.auditImages(imageTest);
  const testData = FetchMapping.cleanData(sortTest);
  FetchMapping.sortData(testData);
  const sortedData = FetchMapping.sortHosts(testData);
  Outputter.outputFile(sortedData, 'test');
};

export default {
  testInput,
};
