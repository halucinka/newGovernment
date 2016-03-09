import bg from 'gulp-bg'
import eslint from 'gulp-eslint'
import gulp from 'gulp'
import makeWebpackConfig from './webpack/makeconfig'
import runSequence from 'run-sequence'
import webpackBuild from './webpack/build'
import webpackDevServer from './webpack/devserver'
import * as shell from 'gulp-shell'
import path from 'path'

gulp.task('default', ['hot'])

// Main tasks

gulp.task('hot', (done) => {
  runSequence('server-hot', 'dev-nodemon', done)
})

gulp.task('eslint', () => {
  return gulp.src([
    'gulpfile.babel.js',
    'src/**/*.js',
    'webpack/*.js',
    '!**/__tests__/*.*',
    '!src/firebase-transactions/**'
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
})

gulp.task('test', (done) => {
  runSequence('eslint', 'build-webpack-production', done)
})

gulp.task('build', webpackBuild(makeWebpackConfig(false)))

gulp.task('prod-server', ['build-webpack-production'], bg('node', 'src/server'))

// Subtasks

gulp.task('server-hot', webpackDevServer(makeWebpackConfig(true)))

gulp.task('dev-nodemon', shell.task(
  // Normalize makes path cross platform.
  path.normalize('node_modules/.bin/nodemon --ignore webpack-assets.json src/server')
))
