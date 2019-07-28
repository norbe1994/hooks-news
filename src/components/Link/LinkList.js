import React from 'react'
import { FirebaseContext } from '../../firebase'
import LinkItem from './LinkItem'

function LinkList({ location: { pathname } }) {
	const { firebase } = React.useContext(FirebaseContext)
	const [links, setLinks] = React.useState([])
	const isNewPage = pathname.includes('new')
	let unsubscribe = undefined

	React.useEffect(() => {
		getLinks()

		return () => {
			unsubscribe()
		}
	}, [])

	function getLinks() {
		unsubscribe = firebase.db
			.collection('links')
			.orderBy('created', 'desc')
			.onSnapshot(handleSnapshot)
	}

	function renderLinks() {
		if (isNewPage) {
			return links
		}
		const topLinks = links
			.slice()
			.sort((l1, l2) => l2.votes.length - l1.votes.length)
		return topLinks
	}

	function handleSnapshot(snapshot) {
		const links = snapshot.docs.map(doc => {
			return { id: doc.id, ...doc.data() }
		})
		setLinks(links)
	}

	return (
		<div>
			{renderLinks().map((link, index) => (
				<LinkItem
					key={link.id}
					showCount={true}
					link={link}
					index={index + 1}
				/>
			))}
		</div>
	)
}

export default LinkList
