import fileSystem from 'file-system';

const templateFile = `${__dirname}/../../config.json`;

/**
 * Function description
 *
 * @param {Type} name: parameter description
 *
 * @return {Type}: return description
 */
const ensureSettingsExist = () => {
  if (!fileSystem.fs.existsSync(templateFile)) {
    setAPIKey(false);
  }
};

/**
 * loads the API key from local settings, and exits the script
 * if there is no API key set
 *
 * This should be moved and should set everything as an exportable
 * module any component can import
 *
 * @return {String}: the API key to use
 */
const getAPIKey = () => {
  const settingsRaw = fileSystem.fs.readFileSync(templateFile);
  const settings = JSON.parse(settingsRaw) || false;
  if (settings.API_KEY) {
    return settings.API_KEY;
  } else {
    console.log('No API key is set! Please get an API key and use the command `-a <api_key>` to set your API key');
    process.exit();
  }
};

/**
 * Set the API key to use on the local machine
 *
 * @param {String} apiKey: the key to save
 */
const setAPIKey = (apiKey) => {
  const settings = JSON.stringify({
    API_KEY: apiKey,
  });
  fileSystem.fs.writeFileSync(templateFile, settings);
  console.log('API key saved!');
};

export default {
  ensureSettingsExist,
  getAPIKey,
  setAPIKey,
};
