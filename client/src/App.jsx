import React, {Component} from 'react';
import axios from 'axios';
import InputBar from './InputBar.jsx';
import LinksList from './LinksList.jsx';
import './App.css'

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allLinks: {}
		}
	}

	componentDidMount() {
		axios.get('/v1/allLinks')
		.then((res) => {
			this.setState({allLinks: res.data.allLinks}, () => {
				console.log('Links in storage: ', res.data.allLinks)
			})
		})
		.catch((err) => {
			console.log(err)
		})
	}

	createShortURL(url) {
		 return axios.post('/v1/link', {
			'url': url
		})
		.then((res) => {
			this.setState({allLinks: res.data.allLinks}, () => {
				console.log('Links in storage: ', res.data.allLinks)
			})
			return res.data.addedLink;
		})
		.catch((err) => {
			console.log(err)
			return err;
		})
	}

	deleteURL(url) {
		return axios.delete('/v1/link', {
			params: {'url': url}
		})
		.then((res) => {
			this.setState({allLinks: res.data.allLinks}, () => {
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
        		<LinksList deleteURL={this.deleteURL.bind(this)} allLinks={this.state.allLinks} />
        	</div>
        )
    }
}