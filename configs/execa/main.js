import { $, ExecaError } from 'execa';
import fs from 'fs/promises';
import path from 'path';

/**
 * Write log file with date and `No errors logged.` inner.
 * If `update-error.log` doesn't exist one will be created beside the script
 *
 * @param {string} pathToLogFile - path (absolute is prefered) to the log file
 *
 * @returns {Promise<void>}
 */
async function writeSuccessLogFile(pathToLogFile) {
  try {
    // write logfile beside the script
    await fs.appendFile(
      pathToLogFile,
      `[${new Date().toISOString()}]\n No errors logged.`
    );
    console.log(`Log has been written to the ${pathToLogFile}`);
  } catch (error) {
    console.error(`Error writing log: ${error.message}`);
  }
}

/**
 * Write log file with date and error message inside.
 * If `update-error.log` doesn't exist one will be created beside the script
 *
 * @param {string} pathToLogFile - path (absolute is prefered) to the log file
 * @param {Error | ExecaError} error - object Error
 *
 * @returns {Promise<void>}
 */
async function writeErrorLogFile(pathToLogFile, error) {
  try {
    // write logfile beside the script
    await fs.appendFile(
      pathToLogFile,
      `[${new Date().toISOString()}] ${error.message}\n${
        error?.stderr ?? 'No stderr available.'
      }`
    );
    console.log(`Log has been written to the ${pathToLogFile}`);
  } catch (error) {
    console.error(`Error writing log: ${error.message}`);
  }
}

/**
 * Update the project's | bolerplate's packages and run commands / tests
 * for regression testing and compatibility. If errors occur check the `update-error.log`.
 *
 * @returns {Promise<void>}
 */
async function main() {
  const currentDir = path.resolve();

  const logFile = path.resolve(currentDir, `./configs/execa/update-error.log`);

  // clean up the log file
  await fs.writeFile(logFile, '');

  console.log(`start checking for outdated packages...`);

  try {
    // npm outdated return exitCode 1 if there're updates
    // { reject: false } => prevents script 's crushing because of this
    // (note: npm doesn't pursue Program exit status conventions...)
    /** @type {import('execa').Result} */
    const { stdout } = await $(`npm outdated --json`, {
      stdio: ['pipe', 'pipe', 'pipe'],
      reject: false,
      cleanup: true,
    });

    // stdout empty (no updates) => return
    if (!stdout) {
      console.log('No outdated packages found.\n');
      // write logfile beside the script
      await writeSuccessLogFile(logFile);
      return;
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
        (pack) => pack.current === pack.wanted
      )
    ) {
      console.log('All packages are up-to-date. Skipping npm update.');
      // write logfile beside the script
      await writeSuccessLogFile(logFile);
      return;
    }

    // update packages
    // note: npm update exitCode 0 => no updates, exitCode 1 => updates are available
    console.log('Outdated packages found. Running npm update...\n');
    await $(`npm update`, { stdio: ['pipe', 'pipe', 'pipe'], cleanup: true });

    // run commands to check for errors
    console.log(`Run regression tests...`);
    await $(`npm run html && npm run dev && npm run build && npm run dev`, {
      stdio: ['pipe', 'pipe', 'pipe'],
      cleanup: true,
    });

    // write logfile beside the script
    console.log(`Done successfully!`);
    // write logfile beside the script
    await writeSuccessLogFile(logFile);
  } catch (error) {
    // for the case of npm outdated exitCode === 1 (updates are available)
    if (error instanceof ExecaError && error.exitCode === 1) {
      console.log(
        'Outdated packages found, but no updates available. Current versions === wanted one\n'
      );
      // write logfile beside the script
      await writeSuccessLogFile(logFile);
      return;
    }
    console.error(`An error occured: ${error.message}`);

    // write logfile beside the script
    await writeErrorLogFile(logFile, error);
  }
}

main();
