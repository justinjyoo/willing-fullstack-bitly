import React, {Component} from 'react';
import InputBar from './InputBar.jsx';
import './App.css'

export default class App extends Component {
    render () {
        return (
    		<div>
    			<h1> Welcome to short.ly! </h1>
        		<InputBar />
        	</div>
        )
    }
}