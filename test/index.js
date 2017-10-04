'use strict'

const utils = require('../index')

describe('Codepoint to Unicode', () => {
	it('should convert codepoint "U+6211" into 我', (done) => {
		const result = utils.codepointToUnicode('U+6211')
		result.should.equal('我')
		done()
	})

	it('should convert codepoint "0x6211" into 我', (done) => {
		const result = utils.codepointToUnicode('0x6211')
		result.should.equal('我')
		done()
	})

	it('should convert codepoint 0x6211 into 我', (done) => {
		const result = utils.codepointToUnicode(0x6211)
		result.should.equal('我')
		done()
	})

	it('should convert codepoint "6211" into 我', (done) => {
		const result = utils.codepointToUnicode('6211')
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
