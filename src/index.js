#!/usr/bin/env node
const prompts = require('prompts');

const PROMPT = {
  type: 'multiselect',
  name: 'projectType',
  message: 'What kind of project do you want to create?',
  choices: [
    { title: 'JavaScript Node', value: 'jsNode', selected: true },
  ],
  max: 1,
};

exports.main = async function () {
  const { projectType: [type] } = await prompts(PROMPT);
} 

exports.main();

