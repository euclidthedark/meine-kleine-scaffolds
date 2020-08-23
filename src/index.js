const prompts = require('prompts');

const SCRIPT = {
  type: 'multiselect',
  name: 'projectType',
  message: 'What kind of project do you want to create?',
  choices: [
    { title: 'JavaScript Node', value: 'jsNode' },
  ],
  max: 1,
};

exports.main = async function () {
  const response = await prompts(SCRIPT);
} 

exports.main();

