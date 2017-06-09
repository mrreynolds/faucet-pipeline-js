"use strict";

let crypto = require("crypto");

exports.generateError = err => {
	let msg = `ERROR: ${err}`;
	console.error(`✗ ${msg}`);
	if(err.code) { // Rollup-augmented exception; emit in full detail
		console.error(err);
	}
	return `alert("${msg.replace(/"/g, "\\\"")}");`;
};

exports.generateHash = str => {
	let hash = crypto.createHash("md5");
	hash.update(str);
	return hash.digest("hex");
};

// adapted from uitil <https://github.com/FND/uitil>
exports.debounce = function(delay, fn) {
	let timer;
	return function() {
		let args = arguments;
		if(timer) {
			clearTimeout(timer);
			timer = null;
		}
		timer = setTimeout(_ => {
			fn.apply(null, args);
			timer = null;
		}, delay);
	};
};

// returns a shallow copy while excluding specified properties
exports.filterObject = (obj, excludedProps) => {
	return Object.keys(obj).reduce((memo, key) => {
		if(!excludedProps.includes(key)) {
			memo[key] = obj[key];
		}
		return memo;
	}, {});
};