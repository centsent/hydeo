import gulp from 'gulp';
import karma from 'gulp-karma';
import config from '../config';

gulp.task('unit', ['views'], () => {
  // Nonsensical source to fall back to files listed in karma.conf.js,
  // see https://github.com/lazd/gulp-karma/issues/9
  return gulp.src('./thisdoesntexist')
    .pipe(karma({
      configFile: config.test.karma,
      action: 'run'
    }))
    .on('error', (err) => {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});
