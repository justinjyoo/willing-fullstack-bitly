import React, {Component} from 'react';
import axios from 'axios';
import { CSSTransitionGroup } from 'react-transition-group';
import './InputBar.css'

class InputBar extends Component {
	//
	//	with the exception of render, component lifecycles start here:
	//
	constructor(props) {
		super(props)
		this.state = {
			inputClassName: 'notClicked',
			formClassName: 'notClicked',
			isShortly: false,
			inputValue: 'Enter your link'
		}

		this.endErrorAnimation = this.endErrorAnimation.bind(this)
	}

	componentDidMount() {
		const element = this.refs.form;
		element.addEventListener('animationend', this.endErrorAnimation)
	}


	//
	// custom methods start here:
	//
	onURLChange(event) {
		const userInput = event.target.value

		// pre-fill input with "https://" for the user if the input is empty
		if(this.state.inputValue.length === 0 && userInput.length < 2) {
			this.setState({inputValue: 'https://' + userInput})
		// if we detect a short.ly URL, change button to show "Go"
		} else if(userInput.substr(0, 17) === 'https://short.ly/' && userInput.length === 22) {
			this.setState({isShortly: true})
			this.setState({inputValue: userInput})
		// keep button to show "Submit"
		} else {
			this.setState({isShortly: false})
			this.setState({inputValue: userInput})
		}	
	}

	onClickSubmit() {
		const inputtedURL = this.state.inputValue;
		if(inputtedURL.substr(inputtedURL.length - 4, 4) === '.com' && inputtedURL.substr(0, 8) === 'https://'){
			 this.props.createShortURL(inputtedURL).then( res => {
			 	this.setState({
			 		'inputValue': res,
			 		'isShortly': true
			 	}) 
			 })
		} else if(inputtedURL.substr(0, 16) === 'https://short.ly' && inputtedURL.length === 22){
			this.redirect(inputtedURL);
		} else if (inputtedURL.substr(0, 8) === 'short.ly' && inputtedURL.length === 22){
			this.redirect('https://' + inputtedURL);
		} else {
			if(inputtedURL.length > 0 && inputtedURL !== 'Enter your link') {
				this.setState({formClassName: 'error clicked'})
			} else {
				this.setState({formClassName: 'error notClicked'})
			}		
		}
	}

	onPressEnter(e) {
		if(e.charCode === 13) {
			e.preventDefault()
			this.onClickSubmit();
		}
	}

	redirect(shortLink) {
		axios.get('/v1/link', {
			params: {
				url: shortLink
			}
		})
		.then( res => {
			console.log(res)
			window.location = res.data.longLink
		})
		.catch( err => {
			console.log(err)
		})
	}

	endErrorAnimation() {
		if(this.state.inputValue !== 'Enter your link' || this.state.inputValue > 0) {
			this.setState({formClassName: 'clicked'})	
		} else {
			this.setState({formClassName: 'notClicked'})
		}
		
	}

	onInputEnter() {
		if (this.state.inputClassName === 'notClicked') {
			this.setState({
				inputValue: '',
				inputClassName: 'clicked',
				formClassName: 'clicked'
			})
		}
	}

	onInputLeave() {
		if(this.state.inputValue === '' && this.state.inputClassName	=== 'clicked') {
			this.setState({
				inputValue: 'Enter your link',
				inputClassName: 'notClicked',
				formClassName: 'notClicked'
			})			
		}
	}

	//
	// render lifecycle method
	//
	render() {
		return (
			<form ref={'form'} className={ this.state.formClassName } >
				<input  className={ this.state.inputClassName } value={ this.state.inputValue } onKeyPress={ this.onPressEnter.bind(this) } onClick={ this.onInputEnter.bind(this) } onChange={ this.onURLChange.bind(this) } onBlur={ this.onInputLeave.bind(this) } ></input>
				<button type="button" onClick= { this.onClickSubmit.bind(this) } > { this.state.isShortly ? 'Go' : 'Submit' }</button>
			</form>
		)
	}
}

export default InputBar;