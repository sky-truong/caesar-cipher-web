const btnEncode = document.querySelector('#btn-encode');
const btnDecode = document.querySelector('#btn-decode');
const btnMinus = document.querySelector('#btn-minus');
const btnPlus = document.querySelector('#btn-plus');
let shiftValue = 7;
let shift = 7;
let stringShift = "a→h";
let displayShiftValue = document.querySelector('.field-number__display-value');
let displayShiftLetter = document.querySelector('.field-number__display-description');
let plainTextarea = document.querySelector('.plain-textarea');
let cipherTextarea = document.querySelector('.cipher-textarea');


/**
 * Replace a character at specified index
 * Source: https://www.techiedelight.com/replace-character-specified-index-javascript/
 */
String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
    return this.substring(0, index) + replacement + this.substring(index + 1);
}

/**
 * Display shift value and description of shifted letters
 */
btnMinus.addEventListener('click', () => getShiftChoice('minus'));
btnPlus.addEventListener('click', () => getShiftChoice('plus'));

function getShiftChoice(shiftChoice) {
	if(shiftChoice == 'minus') {
		shiftValue--;
	} else if(shiftChoice == 'plus') {
		shiftValue++;
	}
	displayShiftValue.innerHTML = shiftValue; // display shift value
	shift = shiftValue;
	if(shiftValue < 0) {
		shift = 26 + shiftValue;
	} else if(shiftValue > 25) {
		shift = shiftValue - 26;
	}
	let letterShift = String.fromCharCode('a'.charCodeAt() + shift); // display shifted letter from 'a'
	stringShift = stringShift.replaceAt(2, letterShift);
	displayShiftLetter.innerHTML = stringShift;
	encodeText(plainTextarea.value);
}


/* Shift text based on shift values */
function caesarEncode(text, shiftVal) {
	let letter = '';
	let encodeText = '';
	for(let i = 0; i < text.length; i++) {
		let char2Encode = text.charCodeAt(i);
		let letter2Encode = String.fromCharCode(text.charCodeAt(i));
		if(letter2Encode >= 'A' && letter2Encode <= 'Z') {
			letter = (((char2Encode - 65) + shiftVal) % 26) + 65;
			letter2Encode = String.fromCharCode(letter);
		} else if(letter2Encode >= 'a' && letter2Encode <= 'z') {
			letter = (((char2Encode - 97) + shiftVal) % 26) + 97;
			letter2Encode = String.fromCharCode(letter);
		} else {
			letter = letter2Encode;
		}
		encodeText += letter2Encode;
	}
	return encodeText;
}

/* Placeholder plaintext to ciphertext */
function encodeDefaultText() {
	plainTextarea.textContent = "If he had anything confidential to say, he wrote it in cipher, that is, by so changing the order of the letters of the alphabet, that not a word could be made out.";
	cipherTextarea.textContent = caesarEncode(plainTextarea.textContent, shift);
}
encodeDefaultText();

/* Input plaintext to ciphertext */
function encodeText(val) {
	cipherTextarea.textContent = caesarEncode(val, shift);
	let height = plainTextarea.getAttribute('rows');
	cipherTextarea.setAttribute('rows', height);
}
