const fs = require('fs');

function createProjectDirectory (projectName) {
  return fs.mkdir(`./${projectName}`, { recursive: false }, (error) => {
    if (error) throw error;
  });
}


function buildJavaScriptNodeProject (projectName = 'Node Project') {
  createProjectDirectory(projectName);
}


module.exports = {
  createProjectDirectory,
  buildJavaScriptNodeProject,
};

