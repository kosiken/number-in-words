
// arrays of numbers in string form and an enum to resolve higher order numbers i.e Numbers> 999
const Numbers = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen'
], tens = [
    '','', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
], steps = {
    H: '', T: 'thousand', M: 'million', B: 'billion', TR: 'trillion', Q: 'quadrillion', QU:'quintilion'
}
/**
 * to get the number in words
 * @param {string|number} number - a number in `string` or `number` format 
 */

function nameNumber(number, last, index) {
    let num

    // filter things that have letters in them
    
    if(Number.isNaN(Number(number))) {
        throw new SyntaxError(`${number} is not a number, the number arguement must be a number must be entirely madeup of numbers`)
    }

// resolve the number to string format
    num = typeof number === 'number'?  number.toString(): number
    

    if(/\./.test(num))    throw new SyntaxError(`${number} is a floating number, this version does not support numbers so you have to pass {ignore: true} in the options
    
    i would communicate the availabilty https://github.com/kosiken/number-to-words/issues of floating point cobnversions`)
    
    //single numbers
        if(num.length === 1){
            // check for if this is the last digit in a string like 103 where 3 is the last digit
            if(last) {
                return ` and ${Numbers[parseInt(num)]}`
            }
           else return (parseInt(num)>0?' ': '')+ `${Numbers[parseInt(num)]}`
        }

        // a pair of numbers
            
       else if (num.length === 2) {
        if( /00/.test(num)) return `${nameNumber(num.slice(1))}`
           // checks if the number is less than 20 to resolve it in the Numbers array
            if(parseInt(num)<= 19){
                 // check for if this is the last digits in a string like 10=23 where 2 and 3 are the last digits
                if(last) {
                    return ` and ${Numbers[parseInt(num)]}`
                }
               else return ` ${Numbers[parseInt(num)]}`
               
            }
            else {
                return `${!!last? ' and': ''} ${tens[parseInt(num[0])]}${nameNumber(num[1])}`
            }
    
}
else if(num.length ===3) {
    if(parseInt(num[0])<1) {
        if(index===0)   {
            if( /000/.test(num)) return `${nameNumber(num.slice(1))}`
            return `, and ${nameNumber(num.slice(1))}`}
        return `${nameNumber(num.slice(1))}`
    }
    return `${Numbers[parseInt(num[0])]} hundred${nameNumber(num.slice(1), true)}`
}

    


}

/**
 * 
 * @param {number|string} number - the number must be a string made up of digits or a number
 * @throws if Number is NaN
 *  @returns {string} The value of the number in words
 */


function toWords(number) {

    let num, map = [], sep = 0, counter=0
   // console.log()
    if(Number.isNaN(Number(number))) {
        throw new SyntaxError(`${number} is not a number, the number arguement must be entirely madeup of numbers`)
    }


    num = typeof number === 'number'?  number.toString(): number
    if(!/[1-9]/.test(num)) return 'zero'
   

    for(let i = num.length -1; i>-1; i--) {
        if(sep%3==0&&sep>0) {
            counter++
        }
        map[counter]? map[counter].unshift(num[i]): map[counter]=[num[i]];
        sep++
    }

    map = map.map(i=> i.join(''))

    
  return getAmount(map)
    
    
}
//  sets the number magnitude
function getAmount (arr) {
   
    let array, ammount = (arr.slice(0, arr.length -1)).length;
    switch(ammount) {
        case 0: 
            array = arr.map(i=> {
                return { number: i, meta: 'H'}
            })
            break;
        case 1: 
            array = arr.map((n, i) => {
                return {number: n, meta: i>0?'T':'H'}
            })
            break;
        case 2:  
            array = arr.map((n, i) => {
                return {number: n, meta: i>1?'M':i>0?'T':'H'}
            })
            break;

        case 3:  
            array = arr.map((n, i) => {
                return {number: n, meta: i>2?'B':i>1?'M':i>0?'T':'H'}
            })
            break;
        case 4:  
            array = arr.map((n, i) => {
                return {number: n, meta: i>3?'TR':i>2?'B':i>1?'M':i>0?'T':'H'}
            })
            break;

            //https://faculty.math.illinois.edu/~castelln/prillion_revised_10-05.pdf
        case 5: 
            array = arr.map((n, i) => {
                return {number: n, meta: i>4?'Q':i>3?'TR':i>2?'B':i>1?'M':i>0?'T':'H'}
            })
        case 6: 
            array = arr.map((n, i) => {
                return {number: n, meta: i>5?'QU':i>4?'Q':i>3?'TR':i>2?'B':i>1?'M':i>0?'T':'H'}
            })
            break;

        default: 
            throw new RangeError(arr.reverse().join('')+ ` is too long for this version it only stops in ${steps[Object.keys(steps).pop()]}     
            i would communicate the availabilty https://github.com/kosiken/number-to-words/issues of larger number cobnversions`)
            //break;

        

    }
    return formatNumber(array)
}


function formatNumber(arr) {

    let ans = arr.map((i, index)=>{         return nameNumber(i.number, false, index) +' ' + (parseInt(i.number)>0?steps[i.meta]:'')})
    return  ans.filter(i=> /\w+/.test(i)).reverse().join().replace(",,", '')
}




/**
 * 
 * @param {number|string} number - the number must be a string made up of digits or a number
 * @param {function} cb - The value of the number is passed to this function or an error is passed if the `number` argument is `NaN`
 *  @returns {Promise<string>} will return a promise if no `cb` parameter is passed
 */
function toWordsPromises (number, cb) { 
    let ans
    if (cb) {
        if(typeof cb !=='function') throw new SyntaxError('callback must be a function')
        try{ ans = toWords(number)
         return   cb(undefined,ans)
        }
        catch(err) {
          return  cb(err, undefined)
        } 
    }

    else {
        return new Promise((res, rej)=> {
            toWordsPromises(number, (err, value)=> {
                if (err){
                    rej(err)
                }
                else {
                    res(value)
                }
            })
        })
    }
    
}

console.log(toWords('9007199254740992'))

module.exports = {toWords, nameNumber, toWordsPromises}


