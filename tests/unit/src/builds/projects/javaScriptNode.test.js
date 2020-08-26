const fs = require('fs');
const proxyquire = require('proxyquire');
const { recursiveCopy } = require('../../../../../src/utils/helpers.js');

const PROJECT_NAME = 'test-project';
const isDir = new Map([
  ['package.json', false],
  ['index.js', false],
  ['tests', true],
  ['bootstrap.js', false],
  ['unit', true],
  ['src', true],
  ['index.test.js', false],
]);

const sandbox = sinon.createSandbox();

function cleanUpProjectDirectory () {
  return after('clean up sandbox and created dir', function () {
    fs.rmdirSync(`./${PROJECT_NAME}`, { recursive: true });

    sandbox.resetHistory();
  });
}

function itCallsMkDir () {
  return it('calls `mkdirSync`', function () {
    expect(this.mkdirSyncSpy).to.be.calledOnceWith(
      `./${PROJECT_NAME}`,
      { recursive: false }
    );
  });
}

function itCreatesTheProjectFolder () {
  return it('creates a project folder', function () {
    const isADirectory = fs.existsSync(`./${PROJECT_NAME}`);

    expect(isADirectory).to.be.true;
  });
}

function checkIfSrcIsDirectory (path = `./${PROJECT_NAME}`) {
  return fs.readdir(path, 'utf-8', (error, contents) => {
    if (error) throw error;

    return contents.forEach((dirOrFile) => {
      if (dirOrFile.isDirectory()) {
        expect(isDir.get(dirOrFile)).to.be.true;
        return checkIfSrcIsDirectory(`${path}/${dirOrFile}`);
      }

      return expect(isDir.get(dirOrFile)).to.be.false;
    });
  });
}

describe.only('./src/builds/projects/javascriptNode', function () {
  before('proxyquire buildJavaScriptNodeProject', function () { 
    this.mkdirSyncSpy = sandbox.spy(fs, 'mkdirSync');
    this.recursiveCopySpy = sandbox.spy(recursiveCopy);

    const {
      buildJavaScriptNodeProject,
      createProjectDirectory,
    } = proxyquire('../../../../../src/builds/projects/javaScriptNode.js', {
      fs: {
        mkdir: this.mkdirSyncSpy,
      },
      '../../utils/helpers.js': {
        recursiveCopy: this.recursiveCopySpy,
      },
    });

    this.buildJavaScriptNodeProject = buildJavaScriptNodeProject;
    this.createProjectDirectory = createProjectDirectory;
  });
  
  after('restore sandbox', function () {
    sandbox.restore();
  });

  describe('createProjectDirectory', function () {
    context('when given a project name', function () {
      before('pass project name', function () {
        return this.createProjectDirectory(PROJECT_NAME);
      });

      cleanUpProjectDirectory();

      itCallsMkDir();
      itCreatesTheProjectFolder();
    });
  });

  describe.only('buildJavaScriptNodeProject', function () {
    context('when given a project name', function () {
      before('pass project name', function () {
        this.buildJavaScriptNodeProject(PROJECT_NAME);
      });

      //cleanUpProjectDirectory();

      itCallsMkDir();
      itCreatesTheProjectFolder();
      it('calls recursiveCopySpy', function () {
        expect(this.recursiveCopySpy).to.be.calledOnceWith(
        './src/templates/javaScriptNode',
        `./${PROJECT_NAME}`
        );
      });

      it('builds the JavaScript project', function () {
        return checkIfSrcIsDirectory();
      });
    });
  });
});

