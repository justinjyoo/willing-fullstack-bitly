import React, {Component} from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import './InputBar.css'

class InputBar extends Component {

	constructor(props) {
		super(props)
		this.state = {
			inputClassName: 'notClicked',
			formClassName: 'notClicked'
		}
	}

	onInputClick () {
		if (this.state.inputClassName === 'notClicked') {
			this.setState({
				inputClassName: 'clicked',
				formClassName: 'clicked'
			})
		}
	}

	render () {
		return (
			<form className={this.state.inputClassName} >
				<input className={ this.state.inputClassName } onClick={this.onInputClick.bind(this)} ></input>
				<button type="button"> Submit </button>
			</form>
		)
	}
}

export default InputBar;