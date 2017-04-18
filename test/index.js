'use strict'

const utils = require('../index')

console.log(utils.unicodeToHanzi('U+6211'))
console.log(utils.getToneNumber('wǒ'))
console.log(utils.getToneNumber('wo3'))
console.log(utils.removeTone('wǒ'))
console.log(utils.removeTone('wo3'))
console.log(utils.markToNumber('lǜ'))
console.log(utils.numberToMark('lü4'))
