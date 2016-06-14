# infer-bin [![Build Status](https://travis-ci.org/sindresorhus/infer-bin.svg?branch=master)](https://travis-ci.org/sindresorhus/infer-bin)

> Binary wrapper for [Infer](http://fbinfer.com) - A static analyzer for Java, C and Objective-C

Only macOS and Linux (64-bit) binaries are currently [provided](http://fbinfer.com/docs/getting-started.html).


## CLI

```
$ npm install --global infer-bin
```

```
$ infer
```


## API

```
$ npm install --save infer-bin
```

```js
const execFile = require('child_process').execFile;
const infer = require('infer-bin');

execFile(infer, ['--version'], (err, stdout) => {
	console.log(stdout);
});
```


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
