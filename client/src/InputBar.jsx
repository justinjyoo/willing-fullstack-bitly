import React, {Component} from 'react';
import axios from 'axios';
import { CSSTransitionGroup } from 'react-transition-group';
import './InputBar.css'

class InputBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inputClassName: 'notClicked',
			formClassName: 'notClicked',
			inputValue: 'Enter your link'
		}

		this.endErrorAnimation = this.endErrorAnimation.bind(this)
	}

	componentDidMount() {
		const element = this.refs.form;
		element.addEventListener('animationend', this.endErrorAnimation)
	}

	onURLChange (event) {
		if(this.state.inputValue.length === 0) {
			this.setState({inputValue: 'http://' + event.target.value})
		} else {
			this.setState({inputValue: event.target.value})
		}		
	}

	onSubmit () {
		this.reqShortURL(this.state.inputValue)
	}

	endErrorAnimation () {
		this.setState({formClassName: 'clicked'})
	}

	reqShortURL(url) {
		if(this.state.inputValue.substr(this.state.inputValue.length - 4, 4) === '.com'){
			axios.post('/v1/links', {
				'url': url
			})
			.then((res) => {
				this.setState({inputValue: res.data})
			})
			.catch((err) => {
				console.log(err)
			})
		} else {
			this.setState({formClassName: 'error clicked'})
		}
	}

	onInputEnter () {
		if (this.state.inputClassName === 'notClicked') {
			this.setState({
				inputValue: '',
				inputClassName: 'clicked',
				formClassName: 'clicked'
			})
		}
	}

	onInputLeave () {
		if(this.state.inputValue === '' && this.state.inputClassName	=== 'clicked') {
			this.setState({
				inputValue: 'Enter your link',
				inputClassName: 'notClicked',
				formClassName: 'notClicked'
			})			
		}
	}

	render () {
		return (
			<form ref={'form'} className={this.state.formClassName} >
				<input value={this.state.inputValue} className={ this.state.inputClassName } onClick={ this.onInputEnter.bind(this) } onChange={ this.onURLChange.bind(this) } onBlur={ this.onInputLeave.bind(this) } ></input>
				<button type="button" onClick= {this.onSubmit.bind(this)} > Submit </button>
			</form>
		)
	}
}

export default InputBar;