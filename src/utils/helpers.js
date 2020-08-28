const fs = require('fs');

// TODO: Make async and figure out how to properly test async io.
// TODO: encapsulate directory creation if it doesn't exist in this function.
// TODO: create helper function to throw fs errors

async function recursiveCopy (src, dest) {
  const directoryObjects = await fs.promises.readdir(src, 'utf-8');

  directoryObjects.forEach(async (dirOrFile) => {
    const lstat = await fs.promises.lstat(
      `${src}/${dirOrFile}`,
      { bigInt: false }
    );

    if (lstat.isDirectory()) {
      await fs.promises.mkdir(`${dest}/${dirOrFile}`);
      await recursiveCopy(`${src}/${dirOrFile}`, `${dest}/${dirOrFile}`);
    } else {
      await fs.promises.copyFile(`${src}/${dirOrFile}`, `${dest}/${dirOrFile}`);
    }
  });
}


module.exports = {
  recursiveCopy,
};

