import React from 'react';
import Link from './Link.jsx'
import './LinksList.css'

function LinksList(props) {
	return (
		<ul>
			{
				Object.keys(props.allLinks).map( (longLink) => {
					return <Link key={longLink} deleteURL={props.deleteURL} longLink={longLink} shortLink={props.allLinks[longLink]} />
				})
			}

		</ul>
	)
}

export default LinksList;