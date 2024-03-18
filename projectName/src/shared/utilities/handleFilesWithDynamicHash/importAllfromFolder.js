/**
 * Get all the files' names from the folder to demand webpack use all files in the folder in the final bundle
 * Read more at {link https://webpack.js.org/guides/dependency-management/#context-module-api}.
 * It's expected to use `require.context` of Webpack as a callback function.
 *
 * @typedef {object} - cache
 * @property {string} unhashedFilename - relative path to the hashed filename after Webpack's transformations
 *
 * @param {requireContext} requireContext - use Webpack's `require.context` function.
 *  About the `require.context` of Webpack 5 read here:
 *  https://stackoverflow.com/questions/54059179/what-is-require-context
 *  https://webpack.js.org/guides/dependency-management/#requirecontext
 * @callback requireContext - Webpack's `require.context` function
 * @param {string} directory - relative to the project root path to the directory for search
 * @param {boolean} [useSubdirectories = true] - whether subdirectories should be searched, default = true
 * @param {regExp} [regExp = /^\.\/.*$/] - a regular expression to match files, default = all files
 * @param {string} [mode = 'sync'] - return Promise or not (default `sync` not)
 * @return {cache} - object, where unhashedFilename is a key and relative path to the hashedFilename is a value
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

export default function importAll(requireContext) {
  const cache = {};

  // cache entry e.g. ./book1.png : "src/assets/images/png/favorites/book1.56af.png"
  // filename : relative path to the filenameAfterBundleWithHash
  requireContext.keys().forEach((key) => (cache[key] = requireContext(key)));

  return cache;
}
