'use strict'

const unicodeToHanzi = (unicode) => {
	unicode = unicode.replace('U+', '')
	return String.fromCharCode(parseInt(unicode, 16))
}

const vovels = {
	"a": ['ā', 'á', 'ǎ', 'à'],
	"e": ['ē', 'é', 'ě', 'è'],
	"i": ['ī', 'í', 'ǐ', 'ì'],
	"o": ['ō', 'ó', 'ǒ', 'ò'],
	"u": ['ū', 'ú', 'ǔ', 'ù'],
	"ü": ['ǖ', 'ǘ', 'ǚ', 'ǜ']
}

const getToneNumber = (text) => {
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

const removeTone = (text) => {
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

const markToNumber = (text) => {
	const tone = getToneNumber(text)

	if (tone > 0) {
		for (let v in vovels) {
			for (var t = 0; t < vovels[v].length; t++) {
				if (text.match(vovels[v][t])) {
					text = text.replace(vovels[v][t], v)
				}
			}
		}
		text += tone
	}

	return text	
}

const numberToMark = (text) => {
	const tone = getToneNumber(text)

	if (tone > 0) {
		text = text.replace(/[1-4]/, '')

		const matchedVovels = text.match(/[aeiouü]/g)
		if (matchedVovels) {
			let vovel = matchedVovels[matchedVovels.length-1]

			if (text.match('ou')) vovel = 'o'
			if (text.match('a')) vovel = 'a'
			if (text.match('e')) vovel = 'e'

			text = text.replace(vovel, vovels[vovel][tone-1])
		}
	}

	return text
}

module.exports = {unicodeToHanzi, vovels, getToneNumber, removeTone, markToNumber, numberToMark}
