import { $, ExecaError } from 'execa';

/**
 * Check for outdated npm packages.
 * If there's now updates just write log file with date and 'No errors logged.' message and returns false.
 * If updates avalibale returns true.
 *
 * @param {(pathToLogFile: string, logMessage: string) => Promise<void>} writeSuccessLogFile - callback for
 *    async writing log file via NodeJS
 * @param {(pathToLogFile: string, error: Error | ExecaError) => Promise<void>} writeErrorLogFile - callback for
 *    async writing log file via NodeJS
 * @param {string} logFile - resolved via NodeJS path to the logfile
 * @returns {Promise<boolean | undefined>}
 */
export default async function checkNpmPkgsUpdates(
  writeSuccessLogFile,
  writeErrorLogFile,
  logFile,
) {
  try {
    // npm outdated return exitCode 1 if there're updates
    // { reject: false } => prevents script 's crushing because of this
    // { verbose: 'short' } => to show details in the terminal (use verbose: 'full' for all details)
    // (note: npm doesn't pursue Program exit status conventions...)
    /** @type {import('execa').Result} */
    const { stdout } = await $(`npm outdated --json`, {
      stdio: ['pipe', 'pipe', 'pipe'],
      reject: false,
      verbose: 'full',
      cleanup: true,
    });

    // stdout empty (i.e. {}) (no updates) => return
    if (!stdout) {
      console.log('No outdated packages found.\n');
      // write logfile beside the script
      await writeSuccessLogFile(logFile, 'No outdated packages found.\n');
      return false;
    }

    /**
     * @type {Record<string, Record<string, string>>}
     * @example
     *    {
     *      "eslint": {
     *        "current": "8.57.1",
     *        "wanted": "8.57.1",
     *        "latest": "9.16.0",
     *        "dependent": "boilerplate-eslint-prettier-husky",
     *        "location": "E:\\Code learning\\boilerplate-eslint-prettier-husky\\node_modules\\eslint"
     *      }
     *    }
     */
    const outdatedPackages = JSON.parse(stdout);

    // check that packages' list updates is empty or that current && wanted version are the same
    if (
      Object.values(outdatedPackages).every(
        (pack) => pack.current === pack.wanted,
      )
    ) {
      console.log('All packages are up-to-date. Skipping npm update.');

      // write logfile beside the script
      await writeSuccessLogFile(
        logFile,
        `All packages are up-to-date. Skipping npm update.\nstdout: ${stdout}`,
      );
      return false;
    }

    return true;
  } catch (error) {
    // for the case of npm outdated exitCode === 1 (updates are available)
    if (error instanceof ExecaError && error.exitCode === 1) {
      console.log(
        'Outdated packages found, but no updates available. Current versions === wanted one\n',
      );

      // write logfile beside the script
      await writeSuccessLogFile(
        logFile,
        'Outdated packages found, but no updates available. Current versions === wanted one\n',
      );
      return false;
    }

    console.error(`An error occured: ${error.message}`);

    // write logfile beside the script
    await writeErrorLogFile(logFile, error);
  }
}
