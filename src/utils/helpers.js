const fs = require('fs');

// TODO: Make async and figure out how to properly test async io.
// TODO: encapsulate directory creation if it doesn't exist in this function.
// TODO: create helper function to throw fs errors

function recursiveCopy (src, dest) {
  return fs.readdir(src, 'utf8', (error, contents) => {
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

