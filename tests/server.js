const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server/server');
process.env.NODE_ENV = 'test';

describe('ALL /', () => {
	it('should response to GET / with the static asset home page', () => {
		return request(app)
		.get('/')
		.then( res => {
			expect(res.text.substr(0, 15)).to.equal('<!DOCTYPE html>')
			expect(res.statusCode).to.equal(200)
		})
	})
})

describe('POST /v1/links', () => {
	it('should response to POST /v1/links with a shortened link', () => {
		return request(app)
		.post('/v1/links')
		.send({
			url: 'www.google.com'
		})
		.then( res => {
			expect(res.text.substr(0, 16)).to.equal('http://short.ly/')
			expect(res.statusCode).to.equal(201)
		})
	})

	it('should response to POST /v1/links with no url sent with a 400 status code', () => {
		return request(app)
		.post('/v1/links')
		.then( res => {
			expect(res.text).to.equal('URL is missing from the request.')
			expect(res.statusCode).to.equal(400)
		})
	})
})