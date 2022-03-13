let {toWords, toWordsPromises} = require('./index') 
const {expect, assert} = require('chai');
describe('show number in words', function () {
    it('it should be equal to One Hundred and Nine', function () {
        let ans = toWords(109)
        expect(ans.trim()).to.be.equal('One Hundred and Nine')
    })
} )

describe('strings and numbers to be the same result', function (){
    it('should be equal', function (){
        let ans1=toWords(111),
        ans2=toWords("111")
        expect(ans1).to.be.equal(ans2)

    })
})

describe("throw an error", function () {
    it('should throw', function() {
        assert.throws(toWords, 'undefined is not a number, the number arguement must be entirely madeup of numbers')
    })
})

describe("Return a promise", function () {
    it('should test rejections using catch', () => {
        return toWordsPromises('tu')
          .then(() => {
            return Promise.reject('Expected method to reject.');
          })
          .catch(err=> {
              
            assert.isDefined(err);
          })
      });
  
})

describe("Return a promise", function () {
    it('should test resolutions', () => {
        return toWordsPromises('119')
          .then((val) => {
            assert.isString(val)
          })
          .catch(err=> {
            console.log(err)
            assert.isUndefined(err)
          })
      });

})