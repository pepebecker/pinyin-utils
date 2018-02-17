'use strict'

const codepointToUnicode = codepoint => {
	if (typeof codepoint === 'string') {
		codepoint = codepoint.replace('U+', '')
		
		if (!/^0x/.test(codepoint)) {
			codepoint = '0x' + codepoint
		}
	}


	return String.fromCodePoint(codepoint)
}

const capitalize = text => {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

const vovels = {
	"a": ['ā', 'á', 'ǎ', 'à'],
	"e": ['ē', 'é', 'ě', 'è'],
	"i": ['ī', 'í', 'ǐ', 'ì'],
	"o": ['ō', 'ó', 'ǒ', 'ò'],
	"u": ['ū', 'ú', 'ǔ', 'ù'],
	"ü": ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
	"m": ['m̄', 'ḿ', 'm̌', 'm̀'],
	"n": ['n̄', 'ń', 'ň', 'ǹ']
}

const getToneNumber = text => {
	text = text.toLowerCase()

	const toneNumberRegex = /[a-zü](\d)/
	if (toneNumberRegex.test(text)) {
		return parseInt(text.match(toneNumberRegex)[1])
	}

	for (let v in vovels) {
		for (var i = 0; i < vovels[v].length; i++) {
			if (text.match(vovels[v][i])) {
				return i + 1
			}
		}
	}

	return 5
}

const removeTone = text => {
	// remove tone from pinyin with tone marks
	for (let i in vovels) {
		for (let t of vovels[i]) {
			if (text.match(t)) {
				text = text.replace(t, i)
			}
		}
	}

	// remove tone from pinyin with tone numbers
	text = text.replace(/\d/g, '')

	return text
}

const markToNumber = syllables => {
	const process = pinyin => {
		const tone = getToneNumber(pinyin)
	
		if (tone !== 5) {
			return removeTone(pinyin) + tone
		}

		return pinyin + tone
	}

	if (Array.isArray(syllables)) {
		return syllables.map(process)
	} else {
		return process(syllables)
	}
}

const numberToMark = syllables => {
	const process = pinyin => {
		const tone = getToneNumber(pinyin)

		pinyin = removeTone(pinyin)
	
		if (tone !== 5) {
			const matchedNM = pinyin.match(/^[nm]$/)
			if (matchedNM) {
				const letter = matchedNM[matchedNM.length - 1]
				pinyin = pinyin.replace(letter, vovels[letter][tone - 1])
			} else {
				const matchedVovels = pinyin.match(/[aeiouü]/g)
				if (matchedVovels) {
					let vovel = matchedVovels[matchedVovels.length-1]
		
					if (pinyin.match('ou')) vovel = 'o'
					if (pinyin.match('a')) vovel = 'a'
					if (pinyin.match('e')) vovel = 'e'
		
					pinyin = pinyin.replace(vovel, vovels[vovel][tone-1])
				}
			}
		}

		return pinyin
	}

	if (Array.isArray(syllables)) {
		return syllables.map(process)
	} else {
		return process(syllables)
	}
}

module.exports = {codepointToUnicode, capitalize, vovels, getToneNumber, removeTone, markToNumber, numberToMark}
