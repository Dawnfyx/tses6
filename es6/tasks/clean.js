
// 服务器相关的脚本
import gulp from 'gulp';
import del from 'del';
import args from './util/args';

gulp.task('clean', (cb)=>{
    return del(['server/public', 'server/views'])
})