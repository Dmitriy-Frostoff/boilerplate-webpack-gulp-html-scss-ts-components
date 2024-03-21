import { default as indexHTML, default as indexStyles } from './app/index';
import { logSelfCheck } from './shared/projectNameSelfCheck/index';
export { indexHTML, indexStyles };

window.addEventListener('load', () => {
  logSelfCheck();
});
