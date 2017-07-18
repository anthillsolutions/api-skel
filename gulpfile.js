var gulp = require('gulp');
var clean = require('gulp-clean');
var pm2 = require('pm2');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', function() {
  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('build', function() {
  var tsResult = tsProject.src()
    .pipe(tsProject());

  return tsResult.js
    .pipe(gulp.dest(tsProject.options.outDir));
});

gulp.task('serve', function() {
  return pm2.connect(true, function() {
    pm2.start({
      name: 'server',
      script: tsProject.options.outDir + '/server.js',
    }, function() {
      pm2.streamLogs('all', 0);
    });
  });
});

gulp.task('default', ['serve'], function() {
});
