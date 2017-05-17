'use strict'

const utils = require('../index')

describe('Unicode to Hanzi', () => {
	it('should convert unicode U+6211 into 我', (done) => {
		const result = utils.unicodeToHanzi('U+6211')
		result.should.equal('我')
		done()
	})
})

describe('Tone number', () => {
	it('should get the right tone number', (done) => {
		const result1 = utils.getToneNumber('wǒ')
		const result2 = utils.getToneNumber('wo3')
		result1.should.equal(3)
		result2.should.equal(3)
		done()
	})
})

describe('Remove tone', () => {
	it('should remove the tone correctly', (done) => {
		const result1 = utils.removeTone('wǒ')
		const result2 = utils.removeTone('wo3')
		result1.should.equal('wo')
		result2.should.equal('wo')
		done()
	})
})

describe('Convert', () => {
	it('should convert between tone number and mark correctly', (done) => {
		const result1 = utils.markToNumber('lǜ')
		const result2 = utils.numberToMark('lü4')
		result1.should.equal('lü4')
		result2.should.equal('lǜ')
		done()
	})
})

describe('Capitalize', () => {
	it('should capitalize correctly', (done) => {
		const result1 = utils.capitalize('lǜ')
		const result2 = utils.capitalize('lü4')
		result1.should.equal('Lǜ')
		result2.should.equal('Lü4')
		done()
	})
})

describe('Padding', () => {
	it('should pad number correctly', (done) => {
		const result1 = utils.pad(9, 5)
		const result2 = utils.pad(36, 5)
		const result3 = utils.pad(1025, 5)
		result1.should.equal('00009')
		result2.should.equal('00036')
		result3.should.equal('01025')
		done()
	})
})

describe('Contains', () => {
	it('should tell whether or not a word is in the list', (done) => {
		const list = ['wo', 'de', 'mao', 'xi', 'huan', 'he', 'niu', 'nai']
		const result1 = utils.contains(list, 'mao')
		const result2 = utils.contains(list, 'huān')
		result1.should.equal(true)
		result2.should.equal(false)
		done()
	})
})
