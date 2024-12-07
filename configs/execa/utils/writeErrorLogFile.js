import { ExecaError } from 'execa';
import fs from 'fs/promises';

/**
 * Write log file with date and error message inside.
 * If `update-error.log` doesn't exist one will be created beside the script
 *
 * @param {string} pathToLogFile - path (absolute is prefered) to the log file
 * @param {Error | ExecaError} error - object Error
 *
 * @returns {Promise<void>}
 */
export default async function writeErrorLogFile(pathToLogFile, error) {
  try {
    // write logfile beside the script
    await fs.appendFile(
      pathToLogFile,
      `[${new Date().toLocaleString()}] ${error.message}\n${
        (error instanceof ExecaError ? error.stderr : error) ??
        'No stderr available.'
      }`,
    );
    console.log(`Log has been written to the ${pathToLogFile}`);
  } catch (error) {
    console.error(`Error writing log: ${error.message}`);
  }
}
