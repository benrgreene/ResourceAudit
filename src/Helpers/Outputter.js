import fileSystem from 'file-system';
import Processor from './Process';

/**
 * Get the time as a string
 *
 * @return {String}: the time
 */
const getTime = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
};

/**
 * Builds output for a single resource from a host
 *
 * @param {Object} resource: the individual resource to display
 * @param {Object} host: the host the resource is for
 *
 * @return {Node}: the element for the resource to display
 */
const buildResource = (resource, host) => {
  const resourceParamIndex = resource.url.indexOf('?') >= 0 ? resource.url.indexOf('?') : resource.url.length;
  return `<div class="resource">
  <a href="https://${host.host}${resource.url}"><h3 class="resource__name">${resource.url.substring(0, resourceParamIndex)}</h3></a>
  <div class="resource__grid">
    <p class="type">Resource Type: ${resource.contentType}</p>
    <p class="size">Resource Size: ${resource.size / 1000}kB</p>
    <p class="ttfb">Resource TTFB: ${resource.ttfbMS}</p>
    <p class="load-time">Load Time: ${resource.loadMS}</p>
  </div>
</div>`;
};

/**
 * Outputs the data for a speed test
 *
 * @param {Array} data: the data to output
 */
const outputFile = (data, url) => {
  const time = getTime();
  const pageWeight = Processor.getFullSizeOfHosts(data) / 1000;
  const fileName = `./${url.replace(/\//g, '-')}-${time}.html`;
  // get our template file
  const templateFile = `${__dirname}/../Templates/output.html`;
  const template = fileSystem.fs.readFileSync(templateFile, {
    encoding: "utf8"
  });
  // now build the output file
  const content = data.reduce((fileContent, host) => {
    const hostSize = host.totalResources / 1000;
    const hostContent = host.resources.reduce((hostOutput, resource) => {
      return `${hostOutput}${buildResource(resource, host)}`;
    }, '');
    return `${fileContent}
      <details>
        <summary>
          <h2 class="host">${host.host}</h2>
          <p class="size">Host Resources Loaded: ${hostSize.toFixed(2)}kB (${(hostSize / pageWeight * 100).toFixed(2)}% of page weight)</p>
        </summary>
        ${hostContent}
      </details>`;
  }, '');
  // make output replacements
  const fileOutput = template.replace(/__TIME__/g, time)
                             .replace(/__URL__/g, url)
                             .replace(/__CONTENT__/g, content)
                             .replace(/__WEIGHT__/g, `${pageWeight}kB`);
  fileSystem.fs.writeFileSync(fileName, fileOutput);
  console.log(`Audit saved to "${fileName}"`);
};

export default {
  outputFile,
}
