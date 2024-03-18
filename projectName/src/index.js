import { indexHTML, indexStyles } from './app/index.js';
import { logSelfCheck } from './shared/projectNameSelfCheck/index.js';

window.addEventListener('load', () => {
  logSelfCheck();
});
