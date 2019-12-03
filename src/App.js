import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { AuthProvider } from './utils/Auth'
import PrivateRoute from './components/PrivateRoute'
import Admin from './components/Admin'
import 'rsuite/dist/styles/rsuite-default.css'
function App() {
	return (
		<AuthProvider>
			<Router>
				<PrivateRoute exact path='/' component={Home} />
				<PrivateRoute exact path='/admin' component={Admin} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/signup' component={SignUp} />
			</Router>
		</AuthProvider>
	)
}

export default App
