import React from 'react'
import { FirebaseContext } from '../../firebase'
import LinkItem from '../Link/LinkItem'

function SearchLinks() {
	const { firebase } = React.useContext(FirebaseContext)
	const [filter, setFilter] = React.useState('')
	const [links, setLinks] = React.useState([])
	const [filteredLinks, setFilteredLinks] = React.useState([])

	React.useEffect(() => {
		getInitialLinks()
	}, [])

	function getInitialLinks() {
		firebase.db
			.collection('links')
			.get()
			.then(snapshot => {
				const links = snapshot.docs.map(doc => {
					return { id: doc.id, ...doc.data() }
				})
				setLinks(links)
			})
	}

	function handleSearch(event) {
		event.preventDefault()
		const query = filter.toLowerCase()
		const matchedLinks = links.filter(
			({ description, url, postedBy: { name } }) => {
				return (
					description.toLowerCase().includes(query) ||
					url.toLowerCase().includes(query) ||
					name.toLowerCase().includes(query)
				)
			}
		)
		setFilteredLinks(matchedLinks)
	}

	return (
		<div>
			<form onSubmit={handleSearch}>
				<div>
					Search <input onChange={event => setFilter(event.target.value)} />
					<button>OK</button>
				</div>
			</form>

			{filteredLinks.map((filteredLink, index) => (
				<LinkItem
					key={filteredLink.id}
					showCount={false}
					link={filteredLink}
					index={index}
				/>
			))}
		</div>
	)
}

export default SearchLinks
