import React from 'react'
import app from '../utils/Base'

const Home = () => {
	return (
		<>
			<h1>Home</h1>
			<button onClick={() => app.auth().signOut()}>Sign out</button>
		</>
	)
}

export default Home
