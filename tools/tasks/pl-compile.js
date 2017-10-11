const exec = require('child_process').exec;

function compile(done) {
  exec('php ./tools/pattern-lab/core/console --generate', (err, stdout, stderr) => {
    console.log(stdout);

    if (err) {
      console.log(stderr);
      return false;
    }
    done();
    return true;
  });
}

/**
 * Gulp task for auto-namespacing.
 */
module.exports = {
  plCompile: (gulp) => {
    gulp.task('pl-compile', (done) => {
      compile(() => {
        done();
      });
    });
  },
};
