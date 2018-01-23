import React from 'react';
import Link from './Link.jsx'
import './LinksList.css'

function LinksList(props) {
	return (
		<ul>
			{
				Object.keys(props.linksList).map( (longLink) => {
					return <Link key={longLink} deleteURL={props.deleteURL} longLink={longLink} shortLink={props.linksList[longLink]} />
				})
			}

		</ul>
	)
}

export default LinksList;