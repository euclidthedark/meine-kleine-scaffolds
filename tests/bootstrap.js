const sinon = require('sinon');
const { expect, use } = require('chai');
const sinonChai = require('sinon-chai');

use(sinonChai);

global.expect = expect;
global.sinon = sinon;

