import Outputter from './Helpers/Outputter';

// functions for testing
import FetchMapping from './Helpers/FetchMap';
import Images from './Helpers/Images.js';

// test data
import sortTest from './TestData/SortData.js';
//import rawData from './TestData/RawTestData.js';

const testInput = () => {
  const testData = FetchMapping.cleanData(sortTest);
  FetchMapping.sortData(testData);
  const sortedData = FetchMapping.sortHosts(testData);
  Outputter.outputFile(sortedData, 'test');
};

const testImages = () => {

};

export default {
  testInput,
  testImages,
};
