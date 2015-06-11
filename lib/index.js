'use strict';
var path = require('path');
var BinWrapper = require('bin-wrapper');
var decompress = require('decompress');
var decompressTarxz = require('decompress-tarxz');
var osFilterObj = require('os-filter-obj');
var pathExists = require('path-exists');

var VERSION = '0.1.0';
var BASE = 'https://github.com/facebook/infer/releases/download/v' + VERSION + '/';

var binWrapper = new BinWrapper()
	.src(BASE + 'infer-osx-v' + VERSION + '.tar.xz', 'darwin')
	.src(BASE + 'infer-linux64-v' + VERSION + '.tar.xz', 'linux', 'x64')
	.dest(path.join(__dirname, '../vendor'))
	.use(path.join('infer', 'infer', 'bin', 'infer'));

// super ugly hack to work around `bin-wrapper` limitations
var download = binWrapper.download.bind(binWrapper);
binWrapper.download = function (cb) {
	download(function () {
		var filename = path.basename(osFilterObj(this.src())[0].url.replace(/https:\/\//, ''));

		if (pathExists.sync(path.join(__dirname, '../vendor', 'infer'))) {
			cb();
			return;
		}

		var Decompress = require('decompress');
		var decompressTarxz = require('decompress-tarxz');

		new Decompress()
			.src(path.join('vendor', filename))
			.dest(this.dest())
			.use(decompressTarxz({strip: 1}))
			.run(cb);
	}.bind(this));
};

module.exports = binWrapper;
