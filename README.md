# dynamic-numeral

[![Build Status](https://travis-ci.org/mckomo/dynamic-numeral.svg?branch=master)](https://travis-ci.org/mckomo/dynamic-numeral)

Dynamic formats for [Numeral.js](https://github.com/adamwdraper/Numeral-js).


# Usage

First register new format with Numeral.js.

```js
import 'dynamic-numeral/register-format';
``` 

Now you can use dynamic formats: 

```js
const format = "0.01|1.0";

numeral(0.656).format(format); // 0.66
numeral(1.65).format(format); // 1.7
```

Check [tests](https://github.com/mckomo/dynamic-numeral/blob/master/test/registration.test.ts) for more examples.
