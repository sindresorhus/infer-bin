'use strict';
var path = require('path');
var BinWrapper = require('bin-wrapper');
var decompressTarxz = require('decompress-tarxz');

var VERSION = '0.5.0';
var BASE = 'https://github.com/facebook/infer/releases/download/v' + VERSION + '/';

var binWrapper = new BinWrapper()
	.src(BASE + 'infer-osx-v' + VERSION + '.tar.xz', 'darwin')
	.src(BASE + 'infer-linux64-v' + VERSION + '.tar.xz', 'linux', 'x64')
	.dest(path.join(__dirname, '../vendor'))
	.use(path.join('infer', 'bin', 'infer'))
	.configureDownload(function (download) {
		download.addTransform(decompressTarxz({strip: 1}));
	});

module.exports = binWrapper;
