import React, {Component} from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import './Result.css'

function Result (props) {
	return (
		<div className={'result'}>{props.result}</div>
	)
}

export default Result;