const fs = require('fs');
const proxyquire = require('proxyquire');
const { recursiveCopy } = require('../../../../../src/utils/helpers.js');
const { itCreatesTheCorrectFileStructure } = require('../../../../helpers/sharedBehaviors/fs.js');

const TEMPLATE_DIR = './src/templates/javaScriptNode';  
const PROJECT_NAME = 'test-project';
const PROJECT_DIR = `./${PROJECT_NAME}`;
const directoryMap = new Map([
  [`${PROJECT_DIR}/package.json`, false],
  [`${PROJECT_DIR}/index.js`, false],
  [`${PROJECT_DIR}/tests`, true],
  [`${PROJECT_DIR}/tests/bootstrap.js`, false],
  [`${PROJECT_DIR}/unit`, true],
  [`${PROJECT_DIR}/src`, true],
  [`${PROJECT_DIR}/index.test.js`, false],
]);

const sandbox = sinon.createSandbox();

function cleanUpProjectDirectory () {
  return after('clean up sandbox and created dir', function () {
    return fs.promises.rmdir(PROJECT_DIR, { recursive: true });
  });
}

function itCallsMkDir () {
  return it('calls `mkdir`', function () {
    expect(this.mkdirSpy).to.be.calledOnceWith(
      PROJECT_DIR,
      { recursive: false }
    );
  });
}

function itCreatesTheProjectFolder () {
  return it('creates a project folder', async function () {
    const lstat = await fs.promises.lstat(PROJECT_DIR, { bigInt: false });

    expect(lstat.isDirectory()).to.be.true;
  });
}

describe('./src/builds/projects/javascriptNode', function () {
  before('proxyquire buildJavaScriptNodeProject', function () { 
    this.mkdirSpy = sandbox.spy(fs.promises.mkdir);
    this.recursiveCopySpy = sandbox.spy(recursiveCopy);

    const {
      buildJavaScriptNodeProject,
      createProjectDirectory,
    } = proxyquire('../../../../../src/builds/projects/javaScriptNode.js', {
      fs: {
        promises: {
          mkdir: this.mkdirSpy,
        },
      },
      '../../utils/helpers.js': {
        recursiveCopy: this.recursiveCopySpy,
      },
    });

    this.createProjectDirectory = createProjectDirectory;
    this.buildJavaScriptNodeProject = buildJavaScriptNodeProject;
  });

  after(() => {
    return sandbox.restore();
  });

  describe('createProjectDirectory', function () {
    context('when given a project name', function () {
      before('call the function', function () {
        return this.createProjectDirectory(PROJECT_DIR);
      });

      cleanUpProjectDirectory();

      itCallsMkDir();
      itCreatesTheProjectFolder();
    });
  });

  describe.only('buildJavaScriptNodeProject', function () {
    context('when given a project name', function () {
      before('pass project name', function () {
        this.buildJavaScriptNodeProject(PROJECT_DIR);
      });

      cleanUpProjectDirectory();

      itCallsMkDir();
      itCreatesTheProjectFolder();
      it('calls recursiveCopySpy', function () {
        expect(this.recursiveCopySpy).to.be.calledOnceWith(
        TEMPLATE_DIR,
        PROJECT_DIR,
        );
      });
      itCreatesTheCorrectFileStructure(directoryMap);
    });
  });
});

