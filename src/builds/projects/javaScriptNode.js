const fs = require('fs');
const { recursiveCopy } = require('../../utils/helpers.js');

const NODE_TEMPLATE_DIR = './src/templates/javaScriptNode';

function buildJavaScriptNodeProject (projectDir = './Node Project') {
  return fs.promises.mkdir(projectDir, { recursive: false })
    .then(() => recursiveCopy(NODE_TEMPLATE_DIR, projectDir));
}


module.exports = {
  buildJavaScriptNodeProject,
};

