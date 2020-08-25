const fs = require('fs');

// TODO: encapsulate directory creation if it doesn't exist in this function.
// TODO: create helper function to throw fs errors

function recursiveCopy (src, dest) {
  fs.readdirSync(src, 'utf-8', (error, contents) => {
    if (error) throw error;

    return contents.forEach((dirOrFile) => {
      return fs.lstat(
        `${src}/${dirOrFile}`,
        { bigInt: false },
        (error, stat) => {
        if (error) throw error;
        if (stat.isDirectory()) {
          fs.mkdirSync(
            `${dest}/${dirOrFile}`,
            { recursive: false }, 
            (error) => {
              if (error) throw error;
            });

          return recursiveCopy(`${src}/${dirOrFile}`, `${dest}/${dirOrFile}`);
        }  
        else {
        return fs.copyFile(
                  `${src}/${dirOrFile}`,
                  `${dest}/${dirOrFile}`,
                  (error) => {
                    if (error) throw error;
                });
        } 
      });
    });
  });
}


module.exports = {
  recursiveCopy,
};

