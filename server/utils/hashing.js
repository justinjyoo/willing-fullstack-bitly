// table that stores the shortenedID as the key and the website as the value
let shortURLtoWebsiteCache = {};

// table that stores the website as the key and the shortenedID as the value
// this table is so we don't have to re-hash a site we've already seen
let websiteToShortURLCache = {};

let Hashids = require('hashids');
// param for Hashids is our salt.
let hashids = new Hashids("we'd like to shorten the urls!");
// start at 1,000,000 count to ensure a 5-digit URL hash
let urlCount = 1000000;

exports.hashURL = (url) => {
	if( websiteToShortURLCache[url] === undefined ) {
		updateURL(url);
	}

	return 'http://short.ly/' + websiteToShortURLCache[url];
}

exports.destroyURL = (url) => {
	websiteToShortURLCache[url] = undefined;
}

exports.updateURL = (url) => {
	let shortenedHash = hashids.encode(urlCount++);
	shortURLtoWebsiteCache[shortenedHash] = url;
	websiteToShortURLCache[url] = shortenedHash;
	return shortenedHash;
}