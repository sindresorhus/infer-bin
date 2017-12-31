'use strict';
const log = require('logalot');
const bin = require('.');

bin.run(['--help'], err => {
	if (err) {
		log.error(err.message);
		log.error('infer binary test failed');
		return;
	}

	log.success('infer binary test passed successfully');
});
