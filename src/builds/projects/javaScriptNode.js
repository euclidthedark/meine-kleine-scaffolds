const fs = require('fs');
const { recursiveCopy } = require('../../utils/helpers.js');

const NODE_TEMPLATE_DIR = './src/templates/javaScriptNode';

function createProjectDirectory (projectDir) {
  return fs.promises.mkdir(projectDir, { recursive: false });
}


function buildJavaScriptNodeProject (projectDir = './Node Project') {
  return createProjectDirectory(projectDir)
    .then(() => recursiveCopy(NODE_TEMPLATE_DIR, projectDir));
}


module.exports = {
  createProjectDirectory,
  buildJavaScriptNodeProject,
};

