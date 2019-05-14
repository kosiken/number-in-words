
# NUMBER IN WORDS  ![build](https://travis-ci.org/kosiken/number-in-words.svg?branch=master)

Just converts numbers from digits to words

## IMPLEMENTATION

```js
const {toWords} = require('to-words')

toWords(100)
// => one hundred 

//or with promises

const {toWordsPromises} = require('to-words')

toWordsPromises(100).then(console.log)
// => one hundred 


```
