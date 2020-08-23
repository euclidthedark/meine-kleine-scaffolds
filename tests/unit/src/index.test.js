const proxyquire = require('proxyquire');
const prompts = require('prompts');

const sandbox = sinon.createSandbox();

// TODO: Create a proxyquire utility

describe('./src/index.js', function () {
  before('set up for testing main function', async function () {
    const promptsStub = sandbox.stub().returns();
    this.promptsStub = promptsStub;

    await proxyquire('../../../src/index.js', {
      'prompts': promptsStub,
    });
  });

  it('calls promts with the correct initial script', function () {
    expect(this.promptsStub).to.be.calledOnceWith({
      type: 'multiselect',
      name: 'projectType',
      message: 'What kind of project do you want to create?',
      choices: [
        { title: 'JavaScript Node', value: 'jsNode' },
      ],
      max: 1,
    });
  });
});

