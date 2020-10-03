const trim = (text: string) => text.replace(/^\s*|\s*$/g, '')

export const codepointToUnicode = (codepoint: string | number) => {
  if (typeof codepoint === 'string') {
    let codepointStr = codepoint.replace('U+', '')
    if (!/^0x/.test(codepointStr)) {
      codepointStr = '0x' + codepointStr
    }
    return String.fromCodePoint(parseInt(codepointStr))
  }
  return String.fromCodePoint(codepoint)
}

/**
 * Four tones:  ̄,  ́,  ̌,  ̀
 */
export const toneMarks = ['\u0304', '\u0301', '\u030c', '\u0300']

export const getToneNumber = (text: string) => {
  // Check for tone number
  const matches = text.match(/[a-zü](\d)/i);
  if (matches) return +matches[1];
  // Check for tone mark
  for (let i = 0; i < toneMarks.length; i++) {
    if (text.normalize('NFD').match(toneMarks[i])) return i + 1
  }
  // Return 5th tone as default
  return 5
}

export const removeTone = (text: string) => {
  text = text.normalize('NFD').replace(/\u0304|\u0301|\u030c|\u0300/g, '')
  return text.normalize('NFC').replace(/(\w|ü)[1-5]/gi, '$1')
}

export const markToNumber = (text: string, fithTone = true) => {
  if (trim(text).length === 0) return text
  if (fithTone) {
    return removeTone(text) + getToneNumber(text)
  } else {
    const tone = getToneNumber(text)
    return tone === 5 ? removeTone(text) : removeTone(text) + tone
  }
}

export const numberToMark = (text: string) => {
  if (trim(text).length === 0) return text

  const tone = getToneNumber(text)

  text = removeTone(text)

  if (tone !== 5) {
    if (text === 'm' || text === 'n' || text === 'M' || text === 'N') {
      return (text + toneMarks[tone - 1]).normalize('NFC')
    }
    const matchedVovels = text.match(/[aeiouü]/gi);
    if (matchedVovels) {
      let vovel = matchedVovels[matchedVovels.length - 1];
      if (text.match('ou')) vovel = 'o'
      if (text.match('a')) vovel = 'a'
      if (text.match('e')) vovel = 'e'
      return text.replace(vovel, vovel + toneMarks[tone - 1]).normalize('NFC')
    }
  }
  return text
}
