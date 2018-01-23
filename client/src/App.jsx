import React, {Component} from 'react';
import InputBar from './InputBar.jsx';


export default class App extends Component {
    render () {
        return (
    		<div>
    			Welcome to short.ly!
        		<InputBar />
        	</div>
        )
    }
}