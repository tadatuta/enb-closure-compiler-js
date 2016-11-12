# enb-closure-compiler-js

The project is [ENB](https://en.bem.info/toolbox/enb/) tech wrapper for [JS version of closure-compiler](https://github.com/google/closure-compiler-js).

[![NPM version](https://img.shields.io/npm/v/enb-closure-compiler-js.svg?style=flat)](https://www.npmjs.org/package/enb-closure-compiler-js)
[![Build Status](https://img.shields.io/travis/tadatuta/enb-closure-compiler-js/master.svg?style=flat&label=tests)](https://travis-ci.org/tadatuta/enb-closure-compiler-js)
[![Coverage Status](https://img.shields.io/coveralls/tadatuta/enb-closure-compiler-js.svg?style=flat)](https://coveralls.io/r/tadatuta/enb-closure-compiler-js?branch=master)
[![Dependency Status](https://img.shields.io/david/tadatuta/enb-closure-compiler-js.svg?style=flat)](https://david-dm.org/tadatuta/enb-closure-compiler-js)

## Installation

Install `enb-closure-compiler-js` package:

```sh
$ npm install --save-dev enb-closure-compiler-js
```

**Requirements:** `enb 0.16.0+`.

## Quick start

```js
module.exports = function(config) {
    config.nodes('*.bundles/*', function(nodeConfig) {
        nodeConfig.addTechs([
            [require('enb-closure-compiler-js/techs/closure-compiler'), {
                target: '?.js',
                source: '?.pre.js',
                flags: {
                    compilationLevel: 'SIMPLE'
                },
                sourcemap: true
            }]
        ]);
    });
};
```

## Available flags

See https://github.com/google/closure-compiler-js#flags.

License
-------

© 2016 YANDEX LLC. Код лицензирован [Mozilla Public License 2.0](LICENSE.txt).
