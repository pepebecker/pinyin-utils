# Pinyin Utils

[![Travis Build Status](https://travis-ci.org/pepebecker/pinyin-utils.svg)](https://travis-ci.org/pepebecker/pinyin-utils)
[![Coverage Status](https://coveralls.io/repos/github/pepebecker/pinyin-utils/badge.svg)](https://coveralls.io/github/pepebecker/pinyin-utils)
[![dependency status](https://img.shields.io/david/pepebecker/pinyin-utils.svg)](https://david-dm.org/pepebecker/pinyin-utils)
[![dev dependency status](https://img.shields.io/david/dev/pepebecker/pinyin-utils.svg)](https://david-dm.org/pepebecker/pinyin-utils#info=devDependencies)
[![MIT-licensed](https://img.shields.io/github/license/pepebecker/pinyin-utils.svg)](https://opensource.org/licenses/MIT)
[![chat on gitter](https://badges.gitter.im/pepebecker.svg)](https://gitter.im/pepebecker)

## Install

```shell
npm install pinyin-utils@pepebecker/pinyin-utils
```

## Usage

```js
const utils = require('pinyin-utils')
console.log(utils.getToneNumber('shì'))     // 4
console.log(utils.getToneNumber('shi4'))    // 4
console.log(utils.removeTone('wǒ'))         // wo
console.log(utils.removeTone('wo3'))        // wo
console.log(utils.markToNumber('lǜ'))       // lü4
console.log(utils.numberToMark('lü4'))      // lǜ
console.log(utils.capitalize('hǎo'))        // Hǎo
console.log(utils.capitalize('hao3'))       // Hao3
```

## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/pepebecker/pinyin-utils/issues).