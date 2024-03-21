export type cacheType = Record<string, string>;

export type requireContext = (
  directory: string,
  useSubdirectories: boolean,
  regExp: RegExp,
  mode: string,
) => string;

export interface InterfaceWebpackContextModuleAPI {
  id: () => string;
  keys: () => Array<string>;
  resolve: (request: string) => string;
  (request: string): string;
}

/**
 * Create your own context with the require.context() function to use it in the importAll function.
 * Read more at {link https://webpack.js.org/guides/dependency-management/#requirecontext}.
 *
 * @typedef {Object} webpackContext
 * @property {() => string} id - string, got as a result of requireContext function execution.
 *  Contains path/to/the/desired/folder, sync or async type, recursive or not search, desired file extensions
 * @property {() => string[]} keys - the string array of filenames of the desired folder
 *  (i.e. the input folder of the requireContext function where filenames are ones that satisfy
 *  the requireContext function's input extensions)
 * @property {(request: string) => string} resolve - returns the resolved relative path to the key
 *   (as request param) of keys
 *
 * @callback webpackContext
 * @param {string} request - unhashed filename to get the resolved relative path to the hashed one
 * @returns {string} returns relative path to the key
 *   (as request param) of keys
 *
 * @callback requireContextType - Webpack's `require.context` function
 *  About the `require.context` of Webpack 5 read here:
 *  https://stackoverflow.com/questions/54059179/what-is-require-context
 *  https://webpack.js.org/guides/dependency-management/#requirecontext
 * @param {string} directory - relative to the project root path to the directory for search
 * @param {boolean} [useSubdirectories = true] - whether subdirectories should be searched, default = true
 * @param {RegExp} [regExp = /^\.\/.*$/] - a regular expression to match files, default = all files
 * @param {string} [mode = 'sync'] - return Promise or not (default `sync` not)
 * @returns {webpackContext} - webpackContext API module with methods: id, keys, resolve or returns
 *  the resolved relative path to the hashed key that match unhashed one
 *
 * @example
 *  importAll(
 *    require.context(
 *      '../../../assets/images/png/favorites/',
 *      true,
 *      /\.(png|jpeg|jpg)$/,
 *    ),
 *  ) => {
 *    id: './library/src/assets/images/png/favorites sync recursive \\.(png%7Cjpeg%7Cjpg)$',
 *    keys: [
 *     "./book1.png",
 *     "./book10.png",
 *     "./book11.png",
 *     "./book12.png",
 *     "./book13.png",
 *     "./book14.png",
 *     "./book15.png",
 *     "./book16.png",
 *     "./book2.png",
 *     "./book3.png",
 *     "./book4.png",
 *     "./book5.png",
 *     "./book6.png",
 *     "./book7.png",
 *     "./book8.png",
 *     "./book9.png"
 *     ],
 *    resolve: [
 *     'src/assets/images/png/favorites/book1.56af.png',
 *     'src/assets/images/png/favorites/book10.54cd.png',
 *     'src/assets/images/png/favorites/book11.29ad.png',
 *     'src/assets/images/png/favorites/book12.d1a5.png',
 *     'src/assets/images/png/favorites/book13.3efc.png',
 *     'src/assets/images/png/favorites/book14.7591.png',
 *     'src/assets/images/png/favorites/book15.45d4.png',
 *     'src/assets/images/png/favorites/book16.7558.png',
 *     'src/assets/images/png/favorites/book2.8050.png',
 *     'src/assets/images/png/favorites/book3.1d2c.png',
 *     'src/assets/images/png/favorites/book4.dc96.png',
 *     'src/assets/images/png/favorites/book5.a8ad.png',
 *     'src/assets/images/png/favorites/book6.362b.png',
 *     'src/assets/images/png/favorites/book7.246f.png',
 *     'src/assets/images/png/favorites/book8.8730.png',
 *     'src/assets/images/png/favorites/book9.934e.png',
 *    ]
 * }
 */

/**
 *  Get all the files' names from the folder to demand webpack use all files in the folder in the final bundle
 *  Read more at {link https://webpack.js.org/guides/dependency-management/#context-module-api}.
 *  It's expected to use `require.context` of Webpack as a callback function.
 *
 * @typedef {Object<string, string>} cacheType - cache object
 * @property {string} unhashedFilename - unhashed filename before Webpack's transformations
 * @property {string} pathToHashedFilename - relative path to the hashed file after Webpack's transformations
 *
 * @param {webpackContext} webpackContext - Webpack's `require.context` function with methods: id, keys, resolve or
 *  returns path to the filename if it was inputed
 * @returns {cacheType}
 *
 * @example
 *  const cache = importAll(
 *    require.context(
 *      '../../../assets/images/png/favorites/',
 *      true,
 *      /\.(png|jpeg|jpg)$/,
 *    ),
 *  );
 *
 * cache => {
 *   './book1.png': 'src/assets/images/png/favorites/book1.56af.png',
 *   './book10.png': 'src/assets/images/png/favorites/book10.54cd.png',
 *   './book11.png': 'src/assets/images/png/favorites/book11.29ad.png',
 *   './book12.png': 'src/assets/images/png/favorites/book12.d1a5.png',
 *   './book13.png': 'src/assets/images/png/favorites/book13.3efc.png',
 *   './book14.png': 'src/assets/images/png/favorites/book14.7591.png',
 *   './book15.png': 'src/assets/images/png/favorites/book15.45d4.png',
 *   './book16.png': 'src/assets/images/png/favorites/book16.7558.png',
 *   './book2.png': 'src/assets/images/png/favorites/book2.8050.png',
 *   './book3.png': 'src/assets/images/png/favorites/book3.1d2c.png',
 *   './book4.png': 'src/assets/images/png/favorites/book4.dc96.png',
 *   './book5.png': 'src/assets/images/png/favorites/book5.a8ad.png',
 *   './book6.png': 'src/assets/images/png/favorites/book6.362b.png',
 *   './book7.png': 'src/assets/images/png/favorites/book7.246f.png',
 *   './book8.png': 'src/assets/images/png/favorites/book8.8730.png',
 *   './book9.png': 'src/assets/images/png/favorites/book9.934e.png',
 * };
 */
export default function importAll(
  webpackContext: InterfaceWebpackContextModuleAPI,
): cacheType {
  const cache: cacheType = {};

  // e.g. cache entry ./book1.png : "src/assets/images/png/favorites/book1.56af.png"
  // i.e. filename : relative path to the filenameAfterBundleWithHash
  webpackContext.keys().forEach((key) => (cache[key] = webpackContext(key)));

  return cache;
}
