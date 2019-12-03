import React, { useCallback, useContext, useState } from 'react'
import { withRouter, Redirect } from 'react-router'
import { Loader } from 'rsuite'
import app from '../utils/Base'
import { AuthContext } from '../utils/Auth'
import { Form, Icon, Input, Button } from 'antd'
import './Login.css'

const Login = ({ history, form }) => {
	const [isLoading, setIsLoading] = useState(false)
	const handleLogin = useCallback(
		async event => {
			setIsLoading(true)
			event.preventDefault()
			await form.validateFields(async (err, values) => {
				if (!err) {
					try {
						await app
							.auth()
							.signInWithEmailAndPassword(values.username, values.password)
							.then(res => {
								const id = res.user.uid
								setIsLoading(false)
								if (id !== process.env.REACT_APP_FIREBASE_APP_ADMIN_ID) {
									history.push('/')
								} else {
									history.push('/admin')
								}
							})
					} catch (error) {
						alert(error)
					}
				}
			})
		},
		[history]
	)

	const { currentUser } = useContext(AuthContext)

	if (currentUser) {
		const id = currentUser.uid
		if (id !== process.env.REACT_APP_FIREBASE_APP_ADMIN_ID) {
			return <Redirect to='/' />
		} else {
			return <Redirect to='/admin' />
		}
	}

	const { getFieldDecorator } = form
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
				flexDirection: 'column'
			}}
		>
			{isLoading ? (
				<Loader backdrop content='chuyển trang...' vertical />
			) : (
				<>
					<img
						src={require('./logo.jpg')}
						style={{ maxWidth: '200px', margin: 'center' }}
					/>
					<Form onSubmit={handleLogin} className='login-form'>
						<Form.Item>
							{getFieldDecorator('username', {
								rules: [{ required: true, message: 'Vui lòng nhập email' }]
							})(
								<Input
									prefix={
										<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
									}
									placeholder='Email'
									name='email'
								/>
							)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: 'Vui lòng nhập mật khẩu' }]
							})(
								<Input
									prefix={
										<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
									}
									type='password'
									placeholder='Mật khẩu'
									name='password'
								/>
							)}
						</Form.Item>
						<Form.Item>
							<Button
								type='primary'
								htmlType='submit'
								className='login-form-button'
							>
								Đăng nhập
							</Button>
						</Form.Item>
					</Form>
				</>
			)}
		</div>
	)
}

const LoginForm = Form.create({ name: 'normal_login' })(Login)
export default withRouter(LoginForm)
