import 'mocha'
import { expect } from 'chai'

import * as utils from '../src/index'
import syllables from './syllables'

describe('Codepoint to Unicode', () => {
  it('should convert codepoint "U+6211" into 我', () => {
    expect(utils.codepointToUnicode('U+6211')).equal('我')
  })

  it('should convert codepoint "0x6211" into 我', () => {
    expect(utils.codepointToUnicode('0x6211')).equal('我')
  })

  it('should convert codepoint 0x6211 into 我', () => {
    expect(utils.codepointToUnicode(0x6211)).equal('我')
  })

  it('should convert codepoint "6211" into 我', () => {
    expect(utils.codepointToUnicode('6211')).equal('我')
  })
})

describe('Tone number', () => {
  it('should get the right tone number', () => {
    for (const s of syllables) {
      expect(utils.getToneNumber(s[0])).equal(5)
      expect(utils.getToneNumber(s[1])).equal(1)
      expect(utils.getToneNumber(s[2])).equal(2)
      expect(utils.getToneNumber(s[3])).equal(3)
      expect(utils.getToneNumber(s[4])).equal(4)
    }
  })
})

describe('Remove tone', () => {
  it('should remove the tone correctly', () => {
    for (const s of syllables) {
      expect(utils.removeTone(s[0])).equal(s[0])
      expect(utils.removeTone(s[1])).equal(s[0])
      expect(utils.removeTone(s[2])).equal(s[0])
      expect(utils.removeTone(s[3])).equal(s[0])
      expect(utils.removeTone(s[4])).equal(s[0])

      expect(utils.removeTone(s[0] + '1')).equal(s[0])
      expect(utils.removeTone(s[0] + '2')).equal(s[0])
      expect(utils.removeTone(s[0] + '3')).equal(s[0])
      expect(utils.removeTone(s[0] + '4')).equal(s[0])
      expect(utils.removeTone(s[0] + '5')).equal(s[0])
    }
  })
})

describe('Convert', () => {
  it('should convert tone number to mark correctly', () => {
    for (const s of syllables) {
      expect(utils.numberToMark(s[0])).equal(s[0])
      expect(utils.numberToMark(s[0] + '5')).equal(s[0])
      expect(utils.numberToMark(s[0] + '1')).equal(s[1])
      expect(utils.numberToMark(s[0] + '2')).equal(s[2])
      expect(utils.numberToMark(s[0] + '3')).equal(s[3])
      expect(utils.numberToMark(s[0] + '4')).equal(s[4])
    }
  })
  it('should convert mark to tone number correctly', () => {
    for (const s of syllables) {
      expect(utils.markToNumber(s[0])).equal(s[0] + '5')
      expect(utils.markToNumber(s[1])).equal(s[0] + '1')
      expect(utils.markToNumber(s[2])).equal(s[0] + '2')
      expect(utils.markToNumber(s[3])).equal(s[0] + '3')
      expect(utils.markToNumber(s[4])).equal(s[0] + '4')
    }
  })
  it('should convert list of tone numbered Pinyin into list of tone marked Pinyin', () => {
    expect(utils.numberToMark(['Wo3', 'shi4', 'de2', 'guo2', 'ren2']))
      .deep.equal(['Wǒ', 'shì', 'dé', 'guó', 'rén'])
  })
  it('should convert list of tone marked Pinyin into list of tone numbered Pinyin', () => {
    expect(utils.markToNumber(['Wǒ', 'shì', 'dé', 'guó', 'rén']))
      .deep.equal(['Wo3', 'shi4', 'de2', 'guo2', 'ren2'])
  })
})
