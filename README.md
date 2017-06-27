# Pinyin Utils

[![npm version](https://img.shields.io/npm/v/pinyin-utils.svg)](https://www.npmjs.com/package/pinyin-utils)
[![Travis Build Status](https://travis-ci.org/pepebecker/pinyin-utils.svg)](https://travis-ci.org/pepebecker/pinyin-utils)
[![Coverage Status](https://coveralls.io/repos/github/pepebecker/pinyin-utils/badge.svg)](https://coveralls.io/github/pepebecker/pinyin-utils)
[![dependency status](https://img.shields.io/david/pepebecker/pinyin-utils.svg)](https://david-dm.org/pepebecker/pinyin-utils)
[![dev dependency status](https://img.shields.io/david/dev/pepebecker/pinyin-utils.svg)](https://david-dm.org/pepebecker/pinyin-utils#info=devDependencies)
[![MIT-licensed](https://img.shields.io/github/license/pepebecker/pinyin-utils.svg)](https://opensource.org/licenses/MIT)
[![chat on gitter](https://badges.gitter.im/pepebecker.svg)](https://gitter.im/pepebecker)

## Install

```shell
npm install pinyin-utils
```

## Usage

```js
const utils = require('pinyin-utils')
console.log(utils.getToneNumber('shì'))   // 4
console.log(utils.getToneNumber('shi4'))  // 4
console.log(utils.removeTone('wǒ'))       // wo
console.log(utils.removeTone('wo3'))      // wo
console.log(utils.markToNumber('lǜ'))     // lü4
console.log(utils.numberToMark('lü4'))    // lǜ
console.log(utils.capitalize('hǎo'))      // Hǎo
console.log(utils.capitalize('hao3'))     // Hao3
```

## Related

- [`pinyin-split`](https://github.com/pepebecker/pinyin-split)
- [`find-hanzi`](https://github.com/pepebecker/find-hanzi)
- [`pinyin-or-hanzi`](https://github.com/pepebecker/pinyin-or-hanzi)
- [`hanzi-to-pinyin`](https://github.com/pepebecker/hanzi-to-pinyin)
- [`pinyin-convert`](https://github.com/pepebecker/pinyin-convert)
- [`pinyin-bot-core`](https://github.com/pepebecker/pinyin-bot-core)
- [`pinyin-telegram`](https://github.com/pepebecker/pinyin-telegram)
- [`pinyin-messenger`](https://github.com/pepebecker/pinyin-messenger)

## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/pepebecker/pinyin-utils/issues).