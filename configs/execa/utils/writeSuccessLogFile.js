import fs from 'fs/promises';

/**
 * Write log file with date and `No errors logged.` inner.
 * If `update-error.log` doesn't exist one will be created beside the script
 *
 * @param {string} pathToLogFile - path (absolute is prefered) to the log file
 * @param {string} logMessage - log message for writing into the log file
 *
 * @returns {Promise<void>}
 */
export default async function writeSuccessLogFile(pathToLogFile, logMessage) {
  try {
    // write logfile beside the script
    await fs.appendFile(
      pathToLogFile,
      `[${new Date().toLocaleString()}]\n No errors logged.\n\n${logMessage}\n\n`,
    );
    console.log(`Log has been written to the ${pathToLogFile}`);
  } catch (error) {
    console.error(`Error writing log: ${error.message}`);
  }
}
