
// 脚本
import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';//用于脚本执行的顺序

gulp.task('build', gulpSequence('clean', 'css', 'pages', 'scripts', ['browser', 'serve']));