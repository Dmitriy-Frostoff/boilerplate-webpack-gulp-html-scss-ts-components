import { $, ExecaError } from 'execa';

/**
 * Run regression tests.
 *
 * @param {(pathToLogFile: string, error: Error | ExecaError) => Promise<void>} writeErrorLogFile - callback for
 *    async writing log file via NodeJS
 * @param {string} logFile - resolved via NodeJS path to the logfile
 * @returns {Promise<void>}
 */
export default async function runRegressionTests(writeErrorLogFile, logFile) {
  try {
    console.log('Run regression tests...\n');
    await $(`npm run html && npm run dev && npm run build && npm run dev`, {
      stdio: ['pipe', 'pipe', 'pipe'],
      verbose: 'full',
      cleanup: true,
    });
  } catch (error) {
    console.error(`An error occured: ${error.message}`);

    // write logfile beside the script
    await writeErrorLogFile(logFile, error);
  }
}
