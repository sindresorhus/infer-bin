'use strict';
var log = require('logalot');
var bin = require('./');

bin.run(function (err) {
	if (err) {
		log.error(err.message);
		log.error('infer binary test failed');
		return;
	}

	log.success('infer binary test passed successfully');
});
