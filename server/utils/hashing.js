// table that stores the shortenedID as the key and the website as the value
var shortURLtoWebsiteCache = {};

// table that stores the website as the key and the shortenedID as the value
// this table is so we don't have to re-hash a site we've already seen
var websiteToShortURLCache = {};

let Hashids = require('hashids');
// param for Hashids is our salt.
let hashids = new Hashids("we'd like to shorten the urls!");
// start at 1,000,000 count to ensure a 5-digit URL hash
let urlCount = 1000000;

const hashURL = (url) => {
	if( websiteToShortURLCache[url] === undefined ) {
		return {addedLink: updateURL(url), linksList: websiteToShortURLCache};
	}

	return {addedLink: websiteToShortURLCache[url], linksList: websiteToShortURLCache};
}

const destroyURL = (url) => {
	delete shortURLtoWebsiteCache[websiteToShortURLCache[url]];
	delete websiteToShortURLCache[url];
	return websiteToShortURLCache;
}

const updateURL = (url) => {
	let shortenedHash =  'https://short.ly/' + hashids.encode(urlCount++);
	shortURLtoWebsiteCache[shortenedHash] = url;
	websiteToShortURLCache[url] = shortenedHash;
	return shortenedHash;
}

const checkCurrentCache = () => {
	return websiteToShortURLCache;
}

const getURL = (shortenedURL) => {
	return shortURLtoWebsiteCache[shortenedURL];
}

module.exports = {
	hashURL: hashURL,
	destroyURL: destroyURL,
	updateURL: updateURL,
	checkCurrentCache: checkCurrentCache,
	getURL: getURL
}