import gulp from 'gulp';
const { src, dest, series } = gulp;
import include from 'gulp-file-include';
import replace from 'gulp-replace';
import rename from 'gulp-rename';

export function html() {
  return src('projectName/src/pages/index_gulp_include.html', { cwd: '../../' })
    .pipe(
      include({
        prefix: '@@',
        indent: true,
      }),
    )
    .pipe(replace(/="(\.\.\/){2,}/gi, '="../'))
    .pipe(rename('index.html'))
    .pipe(dest('../../projectName/src/pages/'));
}
