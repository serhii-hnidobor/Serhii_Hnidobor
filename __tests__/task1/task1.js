"use strict";

var _task = require("../../tasks/src/task/task1/task1");
var _crypto = require("crypto");
var _fakerator = _interopRequireDefault(require("fakerator"));
var randomBool = require('random-bool');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const fakerator = (0, _fakerator.default)();
describe('Test 1', () => {
  it('should pass task example test', () => {
    expect((0, _task.task1)([1, 2, 'a', 'b'])).toEqual([1, 2]);
    expect((0, _task.task1)([1, 'a', 'b', 0, 15])).toEqual([1, 0, 15]);
    expect((0, _task.task1)([1, 2, 'aasf', '1', '123', 123])).toEqual([1, 2, 123]);
  });
  it('should pass random test', () => {
    const TEST_NUM = 10000;
    for (let i = 0; i < TEST_NUM; i++) {
      const n = (0, _crypto.randomInt)(2, 100000);
      const requestedArray = [];
      const testArray = new Array(n).fill(null).map(() => {
        const isNum = randomBool();
        if (isNum) {
          const randNum = (0, _crypto.randomInt)(0, 100000000);
          requestedArray.push(randNum);
          return randNum;
        }
        const isNeedGenerateWord = randomBool();
        if (isNeedGenerateWord) {
          const randStringLength = (0, _crypto.randomInt)(1, 10000);
          return fakerator.random.string(randStringLength);
        }
        return String((0, _crypto.randomInt)(0, 10000000));
      });
      expect((0, _task.task1)(testArray)).toEqual(requestedArray);
    }
  });
});