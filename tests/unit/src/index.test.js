const proxyquire = require('proxyquire');
const prompts = require('prompts');

const sandbox = sinon.createSandbox();

describe('./src/index.js', function () {
  before('set up prompt stubs', async function () {
    const promptsStub = sandbox.stub().returns({
      projectType: [],
    });
    this.promptsStub = promptsStub;

    await proxyquire('../../../src/index.js', {
      'prompts': promptsStub,
    });
  });

  after('restore sandbox', function () {
    sandbox.restore();
  });

  it('calls promts with the correct initial script', function () {
    expect(this.promptsStub).to.be.calledOnceWith({
      type: 'multiselect',
      name: 'projectType',
      message: 'What kind of project do you want to create?',
      choices: [
        { title: 'JavaScript Node', value: 'jsNode', selected: true },
      ],
      max: 1,
    });
  });
});

