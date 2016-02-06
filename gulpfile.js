/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');
var rsync = require('rsyncwrapper');
var gutil = require('gulp-util');
var push = require('git-push');
var argv = require('minimist')(process.argv.slice(2));


/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

gulp.task('deploy', function() {
  rsync({
    ssh: true,
    src: './dist/',
    dest: 'TindoAdmin@tindomondo.com:~/production',
    recursive: true,
    syncDest: true,
    args: ['--verbose']
  }, function(error, stdout, stderr, cmd) {
    gutil.log(stdout);
  });
});

gulp.task('rsync', function() {
  return gulp.src('./dist/**')
    .pipe(rsync({
      destination: '~/production',
      root: '~',
      hostname: 'tindomondo.com',
      username: 'TindoAdmin',
      incremental: true,
      progress: true,
      relative: true,
      emptyDirectories: true,
      recursive: true,
      clean: true,
      exclude: ['.DS_Store'],
      include: []
    }));
});

gulp.task('moveToDist', function() {
  push('./dist', 'https://github.com/alaponin/TindomondoClientDist', function() {
    console.log('Done!');
  });
});



