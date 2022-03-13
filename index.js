const numberPattern = /^\d+$/;
const MAX_DECIMAL_PLACES = 6;
// arrays of numbers in string form and an enum to resolve higher order numbers i.e Numbers> 999
const  numStrings = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ],
  tens = [
    "",
    "",
    "twenty",
    "thirty",
    "fourty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ],
  denomenations = [
    "",
    "",
    "thousand",
    "million",
    "billion",
    "trillion",
    "quadrillion",
    "quintillion",
  ];


/**
 *
 * @param {string} numberString
 * @returns numberString with commas
 */
function putCommas(numberString) {
    const chars = numberString.split("");
    const len = chars.length - 1;
    let counter = 0;
    let numberWithCommas = [];
    for (let i = len; i > -1; i--) {
      if (counter > 0 && counter % 3 === 0) {
        numberWithCommas.push(",");
      }
      if (numberPattern.test(chars[i])) {
        numberWithCommas.push(chars[i]);
        counter++;
      }
    }
    return numberWithCommas.reverse().join("");
}


/**
 *
 * @param {string} stringToCapitalize
 * @returns capitalized String
 */
 function capitalize(stringToCapitalize) {
    if (stringToCapitalize.length === 0) {
      return stringToCapitalize;
    } else if (stringToCapitalize.length === 1) {
      return stringToCapitalize.toUpperCase();
    }
    return (
      stringToCapitalize.substring(0, 1).toUpperCase() +
      stringToCapitalize.substring(1)
    );
  }
  

/**
 *
 * @param {string} numString
 * @returns {string} capitalized String
 */
 function nameNumber(numString) {
    let number = parseInt(numString);
    if (number == 0) {
      return "";
    }
  
    if (numString.length > 3) {
      return "";
    }
    if (numString.charAt(0) === "0") {
      if (numString.length > 1)
        return capitalize(nameNumber(numString.substring(1)));
      return "";
    }
    if (numString.length < 3) {
      if (number < 20) {
        return capitalize(numStrings[number]);
      } else
        return (
          capitalize(tens[parseInt(numString.substring(0, 1))]) +
          " " +
          nameNumber(numString.substring(1))
        );
    } else {
      let hold = nameNumber(numString.substring(0, 1)) + " Hundred";
      if (numString.substring(1)  === "00") {
        return hold;
      }
      return hold + " and " + nameNumber(numString.substring(1));
    }
  }
  

/**
 * 
 * @param {number|string} number - the number must be a string made up of digits or a number
 * @throws if Number is NaN
 *  @returns {string} The value of the number in words
 */

function toWords(numberToConvert) {
    if(isNaN(Number(numberToConvert))) {
        throw new SyntaxError(`${numberToConvert} is not a number, the number arguement must be entirely madeup of numbers`)
    }
    const number = numberToConvert.toString();
    const floatingPointMark = number.indexOf(".");
    let numberStr = ""; let numbersAfteDecimals = "";
    if(floatingPointMark > -1) {
        numberStr = number.substring(0, floatingPointMark);
        numbersAfteDecimals= number.substring(floatingPointMark + 1);
    }
    else  {
        numberStr  = number;
    }
     numberStr = putCommas(numberStr);
    const groups = numberStr.split(",");
    if(groups.length > denomenations.length) {
        return "Too Large";
    }
    let accumulator = "";

    for (let i = 0; i < groups.length; i++) {
        let numberName = nameNumber(groups[i]).trim();
        if(numberName.length === 0) continue;
        let denomenation = denomenations[groups.length - i];
        if(!(denomenation.length === 0)) {
            denomenation = " " + capitalize(denomenation);
        }
        accumulator += numberName;
        accumulator += denomenation;
        if(i < groups.length - 1) {
            if(i == (groups.length - 2)) {
                if(parseInt(groups[i+1]) == 0) continue;
            }
            accumulator += ', '
        }
    }
    let isEmpty = accumulator.length === 0;
  
   if(numbersAfteDecimals.length > 0 && numbersAfteDecimals.length < MAX_DECIMAL_PLACES) {
       if(isEmpty) {
        accumulator += "Zero point";
       }
       else accumulator +=" point" ;
        for (let  c of numbersAfteDecimals.split('')) {
            if(c == '0') {
                accumulator += ' ';
                accumulator += 'Zero';
            }
           else{
            accumulator += ' ';
            accumulator += nameNumber(c + "");
            
        }
    }
}
    return accumulator;
}/**
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
module.exports = {toWords, nameNumber, toWordsPromises}


