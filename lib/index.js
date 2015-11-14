'use strict';
var path = require('path');
var childProcess = require('child_process');
var BinWrapper = require('bin-wrapper');
var osFilterObj = require('os-filter-obj');
var pathExists = require('path-exists');

var VERSION = '0.4.0';
var BASE = 'https://github.com/facebook/infer/releases/download/v' + VERSION + '/';

var binWrapper = new BinWrapper()
	.src(BASE + 'infer-osx-v' + VERSION + '.tar.xz', 'darwin')
	.src(BASE + 'infer-linux64-v' + VERSION + '.tar.xz', 'linux', 'x64')
	.dest(path.join(__dirname, '../vendor'))
	.use(path.join('infer', 'bin', 'infer'));

// super ugly hack to work around `bin-wrapper` limitations
var get = binWrapper.get.bind(binWrapper);
binWrapper.get = function (cb) {
	get(function () {
		var filename = path.basename(osFilterObj(this.src())[0].url.replace(/https:\/\//, ''));

		if (pathExists.sync(path.join(__dirname, '../vendor', 'infer'))) {
			cb();
			return;
		}

		childProcess.execFile('tar', [
			'--strip-components=1',
			'--extract',
			'--file', filename
		], {
			cwd: path.join(__dirname, '../vendor')
		}, function (err) {
			if (err) {
				throw err;
			}

			cb();
		});
	}.bind(this));
};

module.exports = binWrapper;
