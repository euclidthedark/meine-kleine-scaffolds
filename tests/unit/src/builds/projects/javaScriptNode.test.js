const fs = require('fs');
const proxyquire = require('proxyquire');

const PROJECT_NAME = 'test-project';

const sandbox = sinon.createSandbox();

function cleanUpProjectDirectory () {
  return after('clean up sandbox and created dir', function () {
    fs.rmdir(`./${PROJECT_NAME}`, (error) => {
      if (error) throw error;
    });

    sandbox.restore();
  });
}
describe('./src/builds/projects/javascriptNode', function () {
  before('proxyquire buildJavaScriptNodeProject', function () { 
    this.mkdirSpy = sandbox.spy(fs, 'mkdir');

    const {
      buildJavaScriptNodeProject,
      createProjectDirectory,
    } = proxyquire('../../../../../src/builds/projects/javaScriptNode.js', {
      fs: {
        mkdir: this.mkdirSpy,
      },
    });

    this.buildJavaScriptNodeProject = buildJavaScriptNodeProject;
    this.createProjectDirectory = createProjectDirectory;
  });
  
  after('restore sandbox', function () {
    sandbox.restore();
  });

  it('exists', function () {
    expect(this.buildJavaScriptNodeProject).to.exist.and.to.be.a('function');
  });

  describe('createProjectDirectory', function () {
    context('when given a name', function () {
      before('pass project name', function () {
        return this.createProjectDirectory(PROJECT_NAME);
      });

      cleanUpProjectDirectory(PROJECT_NAME);

      it('calls `mkdir`', function () {
        expect(this.mkdirSpy).to.be.calledOnceWith(
          `./${PROJECT_NAME}`,
          { recursive: false }
        );
      });

      it('creates a project folder', function () {
        const isADirectory = fs.existsSync(`./${PROJECT_NAME}`);

        expect(isADirectory).to.be.true;
      });
    });
  });
});

