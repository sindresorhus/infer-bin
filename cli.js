#!/usr/bin/env node
'use strict';
const spawn = require('child_process').spawn;

const input = process.argv.slice(2);
const bin = require('.');

spawn(bin, input, {stdio: 'inherit'})
	.on('exit', process.exit);
