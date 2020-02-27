import arg from 'arg';

import FetchSources from './Helpers/FetchSources';
import Settings from './Helpers/Settings';

import Tester from './tester.js';


/**
 * Processes command line arguments passed to the tool
 *
 * @param {Array} rawArgs: the arguements passed into the parser
 *
 * @return {Array}: the cleaned object containing all the parameters
 */
const processArgs = (rawArgs) => {
  const args = arg(
    {
      // commands
      '--url': String,
      '--api-key': String,
      '--test-input': Boolean,
      '--test-images': Boolean,
      // aliases
      '-u': '--url',
      '-a': '--api-key',
      '-t': '--test-input',
      '-i': '--test-images',
    },
    {
      argv: rawArgs.slice(2),
      permissive: true,
    }
  );
  return {
    url: args['--url'] || false,
    api: args['--api-key'] || false,
    test: args['--test-input'] || false,
    images: args['--test-images'] || false,
  }
};

/**
 * Run the tool
 *
 * @param {Array} rawArgs: the arguements passed into the parser
 */
export const runTool = (rawArgs) => {
  const args = processArgs(rawArgs);
  Settings.ensureSettingsExist();

  if (args.test) {
    Tester.testInput();
  } else if (args.images) {

  } else if (args.api) {
    Settings.setAPIKey(args.api);
  } else {
    args.url && FetchSources.fetchSources(args.url);
  }
};
