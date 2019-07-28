import React from 'react'
import { FirebaseContext } from '../../firebase'
import LinkItem from '../Link/LinkItem'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

function LinkDetail({
	match: {
		params: { linkId },
	},
	history: { push },
}) {
	const { firebase, user } = React.useContext(FirebaseContext)
	const [link, setLink] = React.useState(null)
	const [commentText, setCommentText] = React.useState('')
	const linkRef = firebase.db.collection('links').doc(linkId)

	React.useEffect(() => {
		getLink()
	})

	function getLink() {
		linkRef
			.get()
			.then(doc => {
				const link = { id: doc.id, ...doc.data() }
				setLink(link)
			})
			.catch(err => {
				console.error(`Error trying to fetch link with ID: ${linkId}`, err)
			})
	}

	function handleAddComment() {
		if (!user) {
			push('/login')
		} else {
			linkRef.get().then(doc => {
				if (doc.exists) {
					const previousComments = doc.data().comments
					const comment = {
						postedBy: { id: user.uid, name: user.displayName },
						created: Date.now(),
						text: commentText,
					}
					const updatedComments = [...previousComments, comment]
					linkRef.update({ comments: updatedComments })
					setLink(prevState => ({
						...prevState,
						comments: updatedComments,
					}))
					setCommentText('')
				}
			})
		}
	}

	return !link ? (
		<div>Loading...</div>
	) : (
		<div>
			<LinkItem showCount={false} link={link} />
			<textarea
				rows='6'
				cols='60'
				onChange={event => setCommentText(event.target.value)}
				value={commentText}
			/>
			<div>
				<button className='button' onClick={handleAddComment}>
					Add Comment
				</button>
			</div>
			{link.comments.map(({ postedBy: { name }, created, text }, index) => (
				<div key={index}>
					<p className='comment-author'>
						{name} | {distanceInWordsToNow(created)}
					</p>
					<p>{text}</p>
				</div>
			))}
		</div>
	)
}

export default LinkDetail
