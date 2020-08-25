const fs = require('fs');
const { recursiveCopy } = require('../../../../src/utils/helpers.js');

const isDir = new Map([
  ['README.md', false],
  ['single-file.js', false],
  ['a', true],
  ['a-single-file.js', false],
  ['b', true],
  ['b-single-file.js', false],
  ['c', true],
  ['c-single-file.js', false]
]);


function checkIfSrcIsDirectory (src) {
  return fs.readdirSync(src, 'utf-8', (error, contents) => {
    return contents.forEach((dirOrFile) => {
      return fs.lstatSync(
        `${src}/${dirOrFile}`,
        { bigInt: false },
        (error, stat) => {
          if (error) throw error;
          if (stat.isDirectory()) {
            expect(isDir.get(dirOrFile)).to.be.true;

            return checkIfSrcIsDirectory(`${src}/${dirOrFile}`);
          } else {
            expect(isDir.get(dirOrFile)).to.be.false;
          }
        }
      );
    });
  });
}

describe('./src/utils', function () {
  describe('recursiveCopy', function () {
    context('when given a valid path', function () {
      before('set up initial variables and paths', function () {
        this.src = './tests/helpers/template';
        this.dest = './path-for-recursive-copy';

        fs.mkdirSync(this.dest, { recursive: false }, (error) => {
          if (error) throw error;
        });

        expect(fs.existsSync(this.dest)).to.be.true;
        return recursiveCopy(this.src, this.dest);
      });

      after('destroy paths that aren\'t needed', function () {
        fs.rmdirSync(this.dest, { recursive: true });

        expect(fs.existsSync(this.dest)).to.be.false;
      });

      it('creates the directory recursively', function () {
        return checkIfSrcIsDirectory(this.dest);
      });
    });
  });
});

