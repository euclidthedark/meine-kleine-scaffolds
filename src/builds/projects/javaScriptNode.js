const fs = require('fs');

module.exports = function (name = 'Node Project') {
  fs.mkdir(`./${name}`, { recursive: false }, (error) => {
    if (error) throw error;
  });
}

