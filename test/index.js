'use strict'

const utils = require('../index')
const syllables = require('./syllables')

describe('Codepoint to Unicode', () => {
	it('should convert codepoint "U+6211" into 我', done => {
		utils.codepointToUnicode('U+6211').should.equal('我')
		done()
	})

	it('should convert codepoint "0x6211" into 我', done => {
		utils.codepointToUnicode('0x6211').should.equal('我')
		done()
	})

	it('should convert codepoint 0x6211 into 我', done => {
		utils.codepointToUnicode(0x6211).should.equal('我')
		done()
	})

	it('should convert codepoint "6211" into 我', done => {
		utils.codepointToUnicode('6211').should.equal('我')
		done()
	})
})

describe('Tone number', () => {
	it('should get the right tone number', done => {
		syllables.forEach(s => {
			utils.getToneNumber(s[0]).should.equal(5)
			utils.getToneNumber(s[1]).should.equal(1)
			utils.getToneNumber(s[2]).should.equal(2)
			utils.getToneNumber(s[3]).should.equal(3)
			utils.getToneNumber(s[4]).should.equal(4)
		})
		done()
	})
})

describe('Remove tone', () => {
	it('should remove the tone correctly', done => {
		syllables.forEach(s => {
			utils.removeTone(s[0]).should.equal(s[0])
			utils.removeTone(s[1]).should.equal(s[0])
			utils.removeTone(s[2]).should.equal(s[0])
			utils.removeTone(s[3]).should.equal(s[0])
			utils.removeTone(s[4]).should.equal(s[0])

			utils.removeTone(s[0] + '1').should.equal(s[0])
			utils.removeTone(s[0] + '2').should.equal(s[0])
			utils.removeTone(s[0] + '3').should.equal(s[0])
			utils.removeTone(s[0] + '4').should.equal(s[0])
			utils.removeTone(s[0] + '5').should.equal(s[0])
		})
		done()
	})
})

describe('Convert', () => {
	it('should convert tone number to mark correctly', (done) => {
		syllables.forEach(s => {
			utils.numberToMark(s[0]).should.equal(s[0])
			utils.numberToMark(s[0] + '5').should.equal(s[0])
			utils.numberToMark(s[0] + '1').should.equal(s[1])
			utils.numberToMark(s[0] + '2').should.equal(s[2])
			utils.numberToMark(s[0] + '3').should.equal(s[3])
			utils.numberToMark(s[0] + '4').should.equal(s[4])
		})

		done()
	})
	it('should convert mark to tone number correctly', (done) => {
		syllables.forEach(s => {
			utils.markToNumber(s[0]).should.equal(s[0] + '5')
			utils.markToNumber(s[1]).should.equal(s[0] + '1')
			utils.markToNumber(s[2]).should.equal(s[0] + '2')
			utils.markToNumber(s[3]).should.equal(s[0] + '3')
			utils.markToNumber(s[4]).should.equal(s[0] + '4')
		})

		utils.markToNumber(['píng', 'guǒ']).should.deepEqual(['ping2', 'guo3'])
		utils.numberToMark(['ping2', 'guo3']).should.deepEqual(['píng', 'guǒ'])
		
		done()
	})
})

describe('Capitalize', () => {
	it('should capitalize correctly', done => {
		utils.capitalize('lǜ').should.equal('Lǜ')
		utils.capitalize('lü4').should.equal('Lü4')
		utils.capitalize('de5').should.equal('De5')
		utils.capitalize('de').should.equal('De')
		utils.capitalize('ń').should.equal('Ń')
		utils.capitalize('m̌').should.equal('M̌')
		utils.capitalize('biáng').should.equal('Biáng')
		utils.capitalize('miào').should.equal('Miào')
		utils.capitalize('miao4').should.equal('Miao4')
		done()
	})
})
