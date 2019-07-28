import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getDomain } from '../../utils'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import { FirebaseContext } from '../../firebase'

function LinkItem({
	link: {
		id,
		description,
		url,
		votes,
		postedBy: { name, id: postedById },
		created,
		comments,
	},
	index,
	showCount,
	history: { push },
}) {
	const { firebase, user } = React.useContext(FirebaseContext)

	function handleVote() {
		if (!user) {
			push('/login')
		} else {
			const linkRef = firebase.db.collection('links').doc(id)
			linkRef.get().then(doc => {
				if (doc.exists) {
					const previousVotes = doc.data().votes
					const vote = {
						votedBy: { id: user.uid, name: user.displayName },
					}
					const updatedVotes = [...previousVotes, vote]
					linkRef.update({ votes: updatedVotes })
				}
			})
		}
	}

	function handleDeleteLink() {
		const linkRef = firebase.db.collection('links').doc(id)
		linkRef
			.delete()
			.then(() => {
				console.log(`Document with ID ${id} deleted`)
			})
			.catch(err => {
				console.error(`Error deleting document with ID ${id}`, err)
			})
	}

	const postedByAuthUser = user && user.uid === postedById

	return (
		<div className='flex items-start mt2'>
			<div className='flex items-center'>
				{showCount && <span className='gray'>{index}.</span>}
				<div className='vote-button' onClick={handleVote}>
					{/* eslint-disable-next-line*/}
					👍
				</div>
			</div>
			<div className='ml1'>
				<div>
					<a href={url} className='black no-underline'>
						{description}
					</a>{' '}
					<span className='link'>({getDomain(url)})</span>
				</div>
				<div className='f6 lh-copy gray'>
					{votes.length} votes by {name} {distanceInWordsToNow(created)} ago
					{' | '}
					<Link to={`/link/${id}`}>
						{comments.length > 0 ? `${comments.length} comments` : 'discuss'}
					</Link>
					{postedByAuthUser && (
						<>
							{' | '}
							<span className='delete-button' onClick={handleDeleteLink}>
								{/* eslint-disable-next-line*/}
								🗑
							</span>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default withRouter(LinkItem)
