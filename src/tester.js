import Outputter from './Helpers/Outputter';

// functions for testing
import FetchMapping from './Helpers/FetchMap';

// test data
import sortTest from './TestData/SortData.js';

const testInput = () => {
  const testData = FetchMapping.cleanData(sortTest);
  FetchMapping.sortData(testData);
  const sortedData = FetchMapping.sortHosts(testData);
  Outputter.outputFile(sortedData, 'test');
};

export default {
  testInput,
};
