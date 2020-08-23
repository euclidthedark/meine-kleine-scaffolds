const fs = require('fs');

// TODO: encapsulate directory creation if it doesn't exist in this function.
function recursiveCopy (src, dest) {
  fs.readdir(src, 'utf-8', (error, contents) => {
    console.log(contents);
  });
}


module.exports = {
  recursiveCopy,
};

