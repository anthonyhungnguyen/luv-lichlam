import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/User/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { AuthProvider } from './utils/Auth'
import PrivateRoute from './components/PrivateRoute'
import Admin from './components/Admin/Admin'
import ParticlesBg from 'particles-bg'
import 'rsuite/dist/styles/rsuite-default.css'
function App() {
	return (
		<AuthProvider>
			<ParticlesBg type='square' bg={true} num={8} />
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
