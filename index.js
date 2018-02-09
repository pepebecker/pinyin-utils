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
	"ü": ['ǖ', 'ǘ', 'ǚ', 'ǜ']
}

const getToneNumber = text => {
	text = text.toLowerCase()

	let tone = 0

	for (let v in vovels) {
		for (var i = 0; i < vovels[v].length; i++) {
			const t = i + 1
			if (text.match(vovels[v][i])) {
				tone = t
				break
			}
			if (text.match(new RegExp('[a-zü]+'+t))) {
				tone = t
				break
			}
		}
	}

	return tone
}

const removeTone = text => {
	let removed = false

	// remove tone from pinyin with tone marks
	if (getToneNumber(text) > 0) {
		for (let i in vovels) {
			for (let t of vovels[i]) {
				if (text.match(t)) {
					text = text.replace(t, i)
					removed = true
				}
			}
		}
	}

	// remove tone from pinyin with tone numbers
	const matches = text.match(/[1-4]/)
	if (matches && matches.length > 0) {
		text = text.replace(matches[0], '')
		removed = true
	}

	return removed && text
}

const markToNumber = text => {
	const process = pinyin => {
		const tone = getToneNumber(pinyin)
	
		if (tone > 0) {
			for (let v in vovels) {
				for (var t = 0; t < vovels[v].length; t++) {
					if (pinyin.match(vovels[v][t])) {
						pinyin = pinyin.replace(vovels[v][t], v)
					}
				}
			}
			pinyin += tone
		}

		return pinyin
	}

	return text.split(' ').map(process).join(' ')
}

const numberToMark = text => {
	const process = pinyin => {
		const tone = getToneNumber(pinyin)
	
		if (tone > 0) {
			pinyin = pinyin.replace(/[1-4]/, '')
	
			const matchedVovels = pinyin.match(/[aeiouü]/g)
			if (matchedVovels) {
				let vovel = matchedVovels[matchedVovels.length-1]
	
				if (pinyin.match('ou')) vovel = 'o'
				if (pinyin.match('a')) vovel = 'a'
				if (pinyin.match('e')) vovel = 'e'
	
				pinyin = pinyin.replace(vovel, vovels[vovel][tone-1])
			}
		}

		return pinyin
	}

	return text.split(' ').map(process).join(' ')
}

module.exports = {codepointToUnicode, capitalize, vovels, getToneNumber, removeTone, markToNumber, numberToMark}
