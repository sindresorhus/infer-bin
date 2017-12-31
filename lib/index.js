'use strict';
const path = require('path');
const childProcess = require('child_process');
const BinWrapper = require('bin-wrapper');
const osFilterObj = require('os-filter-obj');
const pathExists = require('path-exists');

const VERSION = '0.5.0';
const BASE = `https://github.com/facebook/infer/releases/download/v${VERSION}/`;

const binWrapper = new BinWrapper()
	.src(`${BASE}infer-osx-v${VERSION}.tar.xz`, 'darwin')
	.src(`${BASE}infer-linux64-v${VERSION}.tar.xz`, 'linux', 'x64')
	.dest(path.join(__dirname, '../vendor'))
	.use(path.join('infer', 'bin', 'infer'));

// Super ugly hack to work around `bin-wrapper` limitations
const get = binWrapper.get.bind(binWrapper);
binWrapper.get = function (cb) {
	get(() => {
		const filename = path.basename(osFilterObj(this.src())[0].url.replace(/https:\/\//, ''));

		if (pathExists.sync(path.join(__dirname, '../vendor/infer'))) {
			cb();
			return;
		}

		childProcess.execFile('tar', [
			'--strip-components=1',
			'--extract',
			'--file', filename
		], {
			cwd: path.join(__dirname, '../vendor')
		}, err => {
			if (err) {
				throw err;
			}

			cb();
		});
	});
};

module.exports = binWrapper;
