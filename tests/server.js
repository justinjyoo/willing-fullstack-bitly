const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server/server');
process.env.NODE_ENV = 'test';

describe('ALL /', () => {
	it('should respond to GET / with the static asset home page', () => {
		return request(app)
		.get('/')
		.then( res => {
			expect(res.text.substr(0, 15)).to.equal('<!DOCTYPE html>')
			expect(res.statusCode).to.equal(200)
		})
	})
})

describe('GET /v1/link', () => {
	before(() => {
		return request(app)
		.post('/v1/link')
		.send({
			url: 'https://www.google.com'
		})
	})

	after(() => {
		return request(app)
		.post('/v1/delete')
		.send({
			url: 'https://www.google.com'
		})
	})

	it('should respond to GET /v1/link with a shortened link', () => {
		return request(app)
		.get('/v1/link')
		.query({
			url:  'https://short.ly/4pNGR'
		})
		.then( res => {
			const data = JSON.parse(res.text)
			expect(data.longLink).to.equal('https://www.google.com')
			expect(res.statusCode).to.equal(200)
		})
	})

	it('should respond to GET /v1/link with no url sent with a 400 status code', () => {
		return request(app)
		.get('/v1/link')
		.then( res => {
			expect(res.text).to.equal('URL is missing from the request.')
			expect(res.statusCode).to.equal(400)
		})
	})


})


describe('POST /v1/link', () => {
	after(() => {
		request(app)
		.post('/v1/delete')
		.send({
			url: 'https://www.google.com'
		})
	})

	it('should respond to POST /v1/links with a shortened link', () => {
		return request(app)
		.post('/v1/link')
		.send({
			url: 'https://www.google.com'
		})
		.then( res => {
			data = JSON.parse(res.text)
			expect(data.addedLink.substr(0, 16)).to.equal('https://short.ly')
			expect(res.statusCode).to.equal(201)
		})
	})

	it('should respond to POST /v1/links with no url sent with a 400 status code', () => {
		return request(app)
		.post('/v1/link')
		.then( res => {
			expect(res.text).to.equal('URL is missing from the request.')
			expect(res.statusCode).to.equal(400)
		})
	})
})

describe('DELETE /v1/link', () => {
	before(() => {
		return request(app)
		.post('/v1/link')
		.send({
			url: 'https://www.google.com'
		})
		.then((res) => {	
			return request(app)
			.post('/v1/link')
			.send({
				url: 'https://www.facebook.com'
			})
		})
	})

	after(() => {
		return request(app)
		.del('/v1/link')
		.query({
			url: 'https://www.google.com'
		}).then((res) => {
			return request(app)
			.del('/v1/link')
			.query({
				url: 'https://www.facebook.com'
			})			
		})
	})

	it('should respond to DELETE /v1/link with allLinks object without deleted link', () => {
		return request(app)
		.del('/v1/link')
		.query({
			url: 'https://www.google.com'
		})
		.then( res => {
			data = JSON.parse(res.text)
			expect(data.allLinks).to.deep.equal({"https://www.facebook.com": "https://short.ly/AY4GL"})
			expect(res.statusCode).to.equal(202)
		})
	})

	it('should respond to POST /v1/delete with no url sent with a 400 status code', () => {
		return request(app)
		.del('/v1/link')
		.then( res => {
			expect(res.text).to.equal('URL is missing from the request.')
			expect(res.statusCode).to.equal(400)
		})
	})
})

describe('GET /v1/allLinks', () => {
	before(() => {
		return request(app)
		.post('/v1/link')
		.send({
			url: 'https://www.google.com'
		})
		.then(() => {	
			return request(app)
			.post('/v1/link')
			.send({
				url: 'https://www.facebook.com'
			})
		})
	})

	after(() => {
		return request(app)
		.del('/v1/link')
		.query({
			url: 'https://www.google.com'
		}).then(() => {
			return request(app)
			.del('/v1/link')
			.query({
				url: 'https://www.facebook.com'
			})			
		})
	})

	it('should respond to GET /v1/allLinks with a shortened link', () => {
		return request(app)
		.get('/v1/allLinks')
		.then( res => {
			data = JSON.parse(res.text)
			expect(data.allLinks).to.deep.equal({
				"https://www.facebook.com": "https://short.ly/QKZJ3",
     			"https://www.google.com": "https://short.ly/mBaRj"
  			})
			expect(res.statusCode).to.equal(200)
		})
	})
})