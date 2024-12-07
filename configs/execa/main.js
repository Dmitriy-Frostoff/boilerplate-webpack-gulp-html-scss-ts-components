import fs from 'fs/promises';
import path from 'path';

import writeSuccessLogFile from './utils/writeSuccessLogFile.js';
import writeErrorLogFile from './utils/writeErrorLogFile.js';

import checkNpmPkgsUpdates from './utils/checkNpmPkgsUpdates.js';
import updateNpmPackages from './utils/updateNpmPackages.js';
import runRegressionTests from './utils/runRegressionTests.js';

/**
 * Update the project's | bolerplate's packages and run commands / tests
 * for regression testing and compatibility. If errors occur check the `update-error.log`.
 *
 * @returns {Promise<void>}
 */
async function main() {
  /** @type {string} */
  const currentDir = path.resolve();

  /** @type {string} */
  const logFile = path.resolve(currentDir, `./configs/execa/update-error.log`);

  // clean up the log file
  await fs.writeFile(logFile, '');

  console.log(`start checking for outdated packages...`);

  try {
    // check for npm updates
    /** @type {boolean | undefined} */
    const checkNpmUpdatesResult = await checkNpmPkgsUpdates(
      writeSuccessLogFile,
      writeErrorLogFile,
      logFile,
    );

    //  no updates => return
    if (!checkNpmUpdatesResult) {
      return;
    }

    // update npm packages
    if (checkNpmUpdatesResult) {
      await updateNpmPackages(writeErrorLogFile, logFile);
    }

    // run regression tests or commands to check for errors
    if (checkNpmUpdatesResult) {
      await runRegressionTests(writeErrorLogFile, logFile);
    }

    console.log(`Done successfully!`);

    // write logfile beside the script
    await writeSuccessLogFile(logFile, 'Done successfully!\n');
  } catch (error) {
    console.error(`An error occured: ${error.message}`);

    // write logfile beside the script
    await writeErrorLogFile(logFile, error);
  }
}

main();
