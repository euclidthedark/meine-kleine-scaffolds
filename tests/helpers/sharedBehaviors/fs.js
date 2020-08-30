const fs = require('fs');

function itCreatesTheCorrectFileStructure (directoryMap) {
  return it('creates the correct file structure', async function () {
    for (const key of directoryMap.keys()) {
      const lstat = await fs.promises.lstat(key, { bigInt: false });

      expect(directoryMap.get(key)).to.be.equal(lstat.isDirectory());
    }
  });
}

module.exports = {
  itCreatesTheCorrectFileStructure,
};

