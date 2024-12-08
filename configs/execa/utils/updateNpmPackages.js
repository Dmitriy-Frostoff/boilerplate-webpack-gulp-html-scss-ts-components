import { $, ExecaError } from 'execa';

/**
 * Updates npm packages.
 * Note: npm update exitCode 0 => no updates, exitCode 1 => updates are available.
 *
 * @param {(pathToLogFile: string, error: Error | ExecaError) => Promise<void>} writeErrorLogFile - callback for
 *    async writing log file via NodeJS
 * @param {string} logFile - resolved via NodeJS path to the logfile
 * @returns {Promise<void>}
 */
export default async function updateNpmPackages(writeErrorLogFile, logFile) {
  try {
    console.log('Outdated packages found. Running npm update...\n');
    await $(`npm update`, {
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
