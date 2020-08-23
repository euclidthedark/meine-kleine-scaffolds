const fs = require('fs');
const { recursiveCopy } = require('../../../../src/utils/helpers.js');

const sandbox = sinon.createSandbox();

describe.only('./src/utils', function () {
  before('proxyquire helper requires', function () {
    this.readdirSpy = sandbox.spy(fs, 'readdir');

    const { recursiveCopy } = proxyquire('../../../../src/utils/helpers.js', {
      fs: {
        readdir: this.readdirSpy,
      },
    });
  });
  describe('recursiveCopy', function () {
    it('exists', function () {
      expect(recursiveCopy).to.exist.and.to.be.a('function');
    });

    context('when given a valid path', function () {
      before('set up initial variables and paths', function () {
        this.src = './tests/helpers/template';
        this.dest = './path-for-recursive-copy';

        fs.mkdir(this.dest, { recursive: true }, (error) => {
          if (error) throw error;
        });

        expect(fs.existsSync(this.dest)).to.be.true;
        return recursiveCopy(this.src, this.dest);
      });

      after('destroy paths that aren\'t needed', function () {
        fs.rmdir(this.dest);

        expect(fs.existsSync(this.dest)).to.be.false;
      });

      it('calls blah', function () {
        expect(true).to.be.true;
      });
    });
  });
});

