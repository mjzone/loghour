var gulp = require('gulp'),
    isWin = /^win/.test(process.platform),
    commandSeparator = isWin ? '&' : ';',
    webpack = require('webpack'),
    exec = require('child_process').exec,
    util = require('gulp-util'),
    gulpSequence = require('gulp-sequence');

function runCommand(cmd, done) {
    var ls = exec(cmd);
    ls.stdout.on('data', function(data) {
        console.log(data);
    });
    ls.stderr.on('data', function(data) {
        console.log(data);
    });
    ls.on('close', function(data) {
        done && done();
    });
}

/* Start offline server for local development */
gulp.task('start-offline-server', function(done) {
    runCommand('cd serverless ' + commandSeparator + 'serverless offline start --prefix api', done);
});

/* Start offline server for local development */
gulp.task('start-client', function(done) {
    process.env.IS_OFFLINE = true;
    runCommand('cd web ' + commandSeparator + 'npm start', done);
});

/* Deploy Lambdas and API Gateway to AWS */
gulp.task('deploy-api', function(cb) {
    runCommand('cd serverless' + commandSeparator + ' sls deploy --stage ' + util.env.stage + ' --github_id ' + util.env.github_id + ' --github_secret ' + util.env.github_secret + ' -v');
});

/* Deploy service in AWS */
gulp.task('deploy', gulpSequence(['deploy-api']));

/* Start application locally */
gulp.task('serve', gulpSequence(['start-client', 'start-offline-server']));
