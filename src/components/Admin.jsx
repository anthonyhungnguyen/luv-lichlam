import React from 'react'
import app from '../utils/Base'

const Admin = () => {
	return (
		<>
			<h1>Admin</h1>
			<button onClick={() => app.auth().signOut()}>Sign out</button>
		</>
	)
}

export default Admin
