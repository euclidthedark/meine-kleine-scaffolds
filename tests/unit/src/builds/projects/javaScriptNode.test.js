const fs = require('fs');
const buildJavaScriptNode = require('../../../../../src/builds/projects/javaScriptNode.js');

const sandbox = sinon.createSandbox();

describe('./src/builds/projects/javascriptNode', function () {
  it('exists', function () {
    expect(buildJavaScriptNode).to.exist.and.to.be.a('function');
  });

  context('when given a name', function () {
    before('build spys and invoke buildJavaScriptNode', function () {
      this.mkdirSpy = sandbox.spy(fs, 'mkdir');
      this.projectName = 'my new project';

      return buildJavaScriptNode(this.projectName);
    });

    after('clean up sandbox', function () {
      fs.rmdir(`./${this.projectName}`, (error) => {
        if (error) throw error;
      });

      sandbox.restore();
    });

    it('calls `mkdir`', function () {
      expect(this.mkdirSpy).to.be.calledOnceWith(
        `./${this.projectName}`,
        { recursive: false }
      );
    });

    it('creates a project folder', function () {
      const isADirectory = fs.existsSync(`./${this.projectName}`);

      expect(isADirectory).to.be.true;
    });
  });
});

