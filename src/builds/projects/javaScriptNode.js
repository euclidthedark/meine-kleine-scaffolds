const fs = require('fs');
const { recursiveCopy } = require('../../utils/helpers.js');

const NODE_PROJECT_DIR = './src/templates/javaScriptNode';

function createProjectDirectory (projectName) {
  return fs.mkdirSync(`./${projectName}`, { recursive: false }, (error) => {
    if (error) throw error;
  });
}


function buildJavaScriptNodeProject (projectName = 'Node Project') {
  createProjectDirectory(projectName);
  recursiveCopy(NODE_PROJECT_DIR, `./${projectName}`);
}


module.exports = {
  createProjectDirectory,
  buildJavaScriptNodeProject,
};

