const build = require('../../../../src/builds');

describe('./src/build', function () {
  it('exists', function () {
    expect(build).to.exist.and.to.be.a('function');
  });
});

