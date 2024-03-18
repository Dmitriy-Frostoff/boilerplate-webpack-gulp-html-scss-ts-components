/**
 * The goal is to get appropriate files' names because they contain dynamic hash.
 * Read more at {link https://webpack.js.org/guides/dependency-management/#context-module-api}
 *
 *
 * @typedef {object} - cacheObject
 * @property {string} unhashedFilename - relative path to the hashed filename after Webpack's transformations
 *
 * @param {cacheObject} cacheObject - object, where unhashedFilename is a key
 *                                    and relative path to the hashedFilename is a value
 * @param {regExp} [keyRegExp = /(?<=\/{1})([a-z\d_]*\.)*\1*[a-z]*$/gi] - regExp to match unhashedFilename
 * (default - all files from the directory (only the last part from the path stays - filename!),
 *  like "book1.png" or "_book1.png" or "book1.56af.png")
 * @param {regExp} [valueRegExp = /(?<=\/{1})([a-z\d_]*\.)*\1*[a-z]*$/gi] - regExp to match hashedFilename
 * (after bundle one) (default - as the above one)
 * @return {object} - object, where unhashedFilename is a key
 *                    and hashedFilename is a value
 *
 * @example
 *   import importAll from './importAllfromFolder.js';
 *
 *   const cache = importAll(
 *      require.context(
 *        '../../../assets/images/png/favorites/',
 *        true,
 *        /\.(png|jpeg|jpg)$/,
 *      ),
 *   );
 *
 *   getCashedFilename(
 *     cache,
 *     /book\d+\.(png|jpeg|jpg|gif|svg)/gi,
 *     /book\d+\.[a-z\d]+\.(png|jpeg|jpg|gif|svg)/gi,
 *   ) => {
 *   "book1.png": "book1.56af.png",
 *   "book10.png": "book10.54cd.png",
 *   "book11.png": "book11.29ad.png",
 *   "book12.png": "book12.d1a5.png",
 *   "book13.png": "book13.3efc.png",
 *   "book14.png": "book14.7591.png",
 *   "book15.png": "book15.45d4.png",
 *   "book16.png": "book16.7558.png",
 *   "book2.png": "book2.8050.png",
 *   "book3.png": "book3.1d2c.png",
 *   "book4.png": "book4.dc96.png",
 *   "book5.png": "book5.a8ad.png",
 *   "book6.png": "book6.362b.png",
 *   "book7.png": "book7.246f.png",
 *   "book8.png": "book8.8730.png",
 *   "book9.png": "book9.934e.png"
 *  }
 *
 */

export { default as importAll } from './importAllfromFolder.js';

export function getCashedFilename(
  cacheObject,
  keyRegExp = /(?<=\/{1})([a-z\d_]*\.)*\1*[a-z]*$/gi,
  valueRegExp = /(?<=\/{1})([a-z\d_]*\.)*\1*[a-z]*$/gi,
) {
  /** @type {Array<string>} uncachedKeysArr - e.g. [
    "book1.png",
    "book10.png",
    "book11.png",
    "book12.png",
    "book13.png",
    "book14.png",
    "book15.png",
    "book16.png",
    "book2.png",
    "book3.png",
    "book4.png",
    "book5.png",
    "book6.png",
    "book7.png",
    "book8.png",
    "book9.png"
]
*/
  const uncachedKeysArr = Object.keys(cacheObject).map((key) =>
    key.match(keyRegExp).toString(),
  );

  /** @type {Array<string>} cachedValuesArr - e.g. [
    "book1.56af.png",
    "book10.54cd.png",
    "book11.29ad.png",
    "book12.d1a5.png",
    "book13.3efc.png",
    "book14.7591.png",
    "book15.45d4.png",
    "book16.7558.png",
    "book2.8050.png",
    "book3.1d2c.png",
    "book4.dc96.png",
    "book5.a8ad.png",
    "book6.362b.png",
    "book7.246f.png",
    "book8.8730.png",
    "book9.934e.png"
]
 */
  const cachedValuesArr = Object.values(cacheObject).map((value) =>
    value.match(valueRegExp).toString(),
  );

  const resultObj = {};

  for (let i = 0; i < uncachedKeysArr.length; i++) {
    resultObj[uncachedKeysArr[i]] = cachedValuesArr[i];
  }

  /** @type {Object<string, string>} resultObj - e.g. {"book1.png": "book1.56af.png"} */
  return resultObj;
}
