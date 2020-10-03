/**
 * Create a unicode character from the codepoint of a Chinese character
 * @param codepoint codepoint of Chinese character as number or string type
 * @example
 * ```
 * codepointToUnicode(0x6211)   // 我
 * codepointToUnicode('0x6211') // 我
 * codepointToUnicode('U+6211') // 我
 * codepointToUnicode('6211')   // 我
 * ```
 */
export const codepointToUnicode = (codepoint: number | string) => {
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
 * Four tones: ` ̄` ` ́` ` ̌` ` ̀`
 */
export const toneMarks = ['\u0304', '\u0301', '\u030c', '\u0300']

/**
 * Returns the tone number of a Pinyin syllable
 * @param text Pinyin syllable to get the tone number from
 * @example
 * ```
 * getToneNumber('shì')  // 4
 * getToneNumber('shi4') // 4
 * ```
 */
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

/**
 * Removes the tone mark/number from a Pinyin syllable
 * @param text Pinyin syllable to remove the tone mark/number from
 * @example
 * ```
 * removeTone('wǒ')  // wo
 * removeTone('wo3') // wo
 * ```
 */
export const removeTone = (text: string) => {
  text = text.normalize('NFD').replace(/\u0304|\u0301|\u030c|\u0300/g, '')
  return text.normalize('NFC').replace(/(\w|ü)[1-5]/gi, '$1')
}

/**
 * Converts the tone mark into the corresponding tone number
 * @param text Pinyin syllable containing the tone mark to be converted
 * @param fithTone show fith tone as number (ex. `he` => `he5`)
 * @example
 * ```
 * markToNumber('lǜ')        // lü4
 * markToNumber('he')        // he5
 * markToNumber('he', false) // he
 * ```
 */
export function markToNumber(text: string, fithTone?: boolean): string
/**
 * Converts the tone mark into the corresponding tone number
 * @param list list of Pinyin syllables containing the tone mark to be converted
 * @param fithTone show fith tone as number (ex. `he` => `he5`)
 * @example
 * ```
 * markToNumber(['Wǒ', 'shì', 'dé', 'guó', 'rén'])
 * // ['Wo3', 'shi4', 'de2', 'guo2', 'ren2']
 * markToNumber(['he'])        // ["he5"]
 * markToNumber(['he'], false) // ["he"]
 * ```
 */
export function markToNumber(list: string[], fithTone?: boolean): string[]
export function markToNumber(data: string | string[], fithTone = true): string | string[] {
  const process = (text: string) => {
    if (text.trim().length === 0) return text
    if (fithTone) {
      return removeTone(text) + getToneNumber(text)
    } else {
      const tone = getToneNumber(text)
      return tone === 5 ? removeTone(text) : removeTone(text) + tone
    }
  }
  if (Array.isArray(data)) {
    return data.map(process)
  } else {
    return process(data)
  }
}

/**
 * Converts the tone number into the corresponding tone mark
 * @param text Pinyin syllable containing the tone number to be converted
 * @example
 * ```
 * numberToMark('lü4') // lǜ
 * numberToMark('he5') // he
 * ```
 */
export function numberToMark(text: string): string
/**
 * Converts the tone number into the corresponding tone mark
 * @param list list of Pinyin syllables containing the tone number to be converted
 * @example
 * ```
 * markToNumber(['Wo3', 'shi4', 'de2', 'guo2', 'ren2'])
 * // ['Wǒ', 'shì', 'dé', 'guó', 'rén']
 * numberToMark('he5') // he
 * ```
 */
export function numberToMark(list: string[]): string[]
export function numberToMark(data: string | string[]): string | string[] {
  const process = (text: string) => {
    if (text.trim().length === 0) return text

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
  if (Array.isArray(data)) {
    return data.map(process)
  } else {
    return process(data)
  }
}
