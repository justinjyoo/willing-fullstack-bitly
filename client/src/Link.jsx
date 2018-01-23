import React, {Component} from 'react';

function Link(props) {

	const onClick = e => {props.deleteURL(props.longLink)}

	return <li> <button className={'list'} onClick={onClick} > delete </button> {props.longLink + ':::' + props.shortLink} </li>
}

export default Link;