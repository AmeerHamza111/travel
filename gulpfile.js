var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
browserSync =require('browser-sync').create();

gulp.task('default', function() {
  console.log("Hooray - you created a Gulp task.");
});

gulp.task('html', function() {
  browserSync.reload();
});

gulp.task('styles', function() {
  return gulp.src('./app/assets/images/styles/styles.css')
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function() {

  browserSync.init({
    server: {
      baseDir: "app"
    }
  });
  watch('./app/index.html', gulp.series('html'));
  

  watch('./app/assets/images/styles/**/*.css', gulp.series('cssInject'));

});

gulp.task('cssInject', gulp.series('styles', function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
}));