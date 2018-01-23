import React, {Component} from 'react';
import axios from 'axios';
import InputBar from './InputBar.jsx';
import LinksList from './LinksList.jsx';
import './App.css'

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			linksList: {}
		}
	}

	componentDidMount() {
		axios.get('/v1/allLinks')
		.then((res) => {
			this.setState({linksList: res.data}, () => {
				console.log('Links in storage: ', res.data)
			})
		})
		.catch((err) => {
			console.log(err)
		})
	}

	async createShortURL(url) {
		 return axios.post('/v1/links', {
			'url': url
		})
		.then((res) => {
			this.setState({linksList: res.data.linksList}, () => {
				console.log(this.state.linksList)
			})
			return res.data.addedLink;
		})
		.catch((err) => {
			console.log(err)
			return err;
		})
	}

	async deleteURL(url) {
		return axios.post('/v1/delete', {
			'url': url
		})
		.then((res) => {
			this.setState({linksList: res.data}, () => {
				console.log('Links in storage: ', res.data)
			})
			return res.data.addedLink;
		})
		.catch((err) => {
			console.log(err)
			return err;
		})
	}

    render() {
        return (
    		<div className={'container'} >
    			<h1> Welcome to short.ly! </h1>
        		<InputBar createShortURL={this.createShortURL.bind(this)} />
        		<LinksList deleteURL={this.deleteURL.bind(this)} linksList={this.state.linksList} />
        	</div>
        )
    }
}