import test from 'ava';
import binCheck from 'bin-check';
import m from './';

test.cb('return path to binary and verify that it is working', t => {
	t.plan(2);

	binCheck(m, ['--help'], (err, stdout) => {
		t.ifError(err);
		t.truthy(stdout);
		t.end();
	});
});
