const fs = require('fs');
const proxyquire = require('proxyquire');
const { recursiveCopy } = require('../../../../src/utils/helpers.js');
const {
  itCreatesTheCorrectFileStructure,
} = require('../../../helpers/sharedBehaviors/fs.js');

const sandbox = sinon.createSandbox();

const src = './tests/helpers/template';
const dest = './path-for-recursive-copy';
const directoryMap = new Map([
  ['README.md', false],
  ['single-file.js', false],
  ['a', true],
  ['a-single-file.js', false],
  ['b', true],
  ['b-single-file.js', false],
  ['c', true],
  ['c-single-file.js', false]
]);

describe.only('./src/utils', function () {
  describe('recursiveCopy', function () {
    context('when given a valid path', function () {
      before('set up initial variables and paths', async function () {

        await fs.promises.mkdir(dest, { recursive: false });
        const lstat = await fs.promises.lstat(dest);

        expect(lstat.isDirectory()).to.be.true;
        await recursiveCopy(src, dest);
      });

      after('clean up created dir', function () {
        return fs.promises.rmdir(dest, { recursive: true });
      });

      itCreatesTheCorrectFileStructure(dest, directoryMap);
    });
  });
});

