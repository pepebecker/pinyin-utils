'use strict'

const trim = str => str.replace(/^\s*|\s*$/g, '')

const codepointToUnicode = codepoint => {
	if (typeof codepoint === 'string') {
		codepoint = codepoint.replace('U+', '')
		if (!/^0x/.test(codepoint)) {
			codepoint = '0x' + codepoint
		}
	}
	return String.fromCodePoint(codepoint)
}

// Four tones:  ̄  ́  ̌  ̀
const tones = ['\u0304', '\u0301', '\u030c', '\u0300']

const getToneNumber = str => {
	// Check for tone number
	const matches = str.match(/[a-zü](\d)/i);
	if (matches) return +matches[1];
	// Check for tone mark
	for (let i = 0; i < tones.length; i++) {
		if (str.normalize('NFD').match(tones[i])) return i + 1
	}
	// Return 5th tone as default
	return 5
}

const removeTone = str => {
	str = str.normalize('NFD').replace(/\u0304|\u0301|\u030c|\u0300/g, '')
	return str.normalize('NFC').replace(/(\w|ü)[1-5]/gi, '$1')
}

const markToNumber = (syllables, fithTone = true) => {
	const process = pinyin => {
		if (trim(pinyin).length === 0) return pinyin
		if (fithTone) {
			return removeTone(pinyin) + getToneNumber(pinyin)
		} else {
			const tone = getToneNumber(pinyin)
			return tone === 5 ? removeTone(pinyin) : removeTone(pinyin) + tone
		}
	}

	if (Array.isArray(syllables)) {
		return syllables.map(process)
	} else {
		return process(syllables)
	}
}

const numberToMark = syllables => {
	const process = pinyin => {
		if (trim(pinyin).length === 0) return pinyin

		const tone = getToneNumber(pinyin)

		pinyin = removeTone(pinyin)
	
		if (tone !== 5) {
			if (pinyin === 'm' || pinyin === 'n' || pinyin === 'M' || pinyin === 'N') {
				return (pinyin + tones[tone - 1]).normalize('NFC')
			}
			const matchedVovels = pinyin.match(/[aeiouü]/gi);
			if (matchedVovels) {
				let vovel = matchedVovels[matchedVovels.length - 1];
				if (pinyin.match('ou')) vovel = 'o'
				if (pinyin.match('a')) vovel = 'a'
				if (pinyin.match('e')) vovel = 'e'
				return pinyin.replace(vovel, vovel + tones[tone - 1]).normalize('NFC')
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

module.exports = {
	codepointToUnicode,
	tones,
	getToneNumber,
	removeTone,
	markToNumber,
	numberToMark
}
