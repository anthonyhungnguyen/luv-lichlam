import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd'
import { Loader } from 'rsuite'
import app from '../../utils/Base'
import Table from './Table'

const { Header, Content, Footer } = Layout

const Home = () => {
	const [canEdit, setCanEdit] = useState()
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		getLock()
	}, [])
	const getLock = async () => {
		await app
			.firestore()
			.collection('auth')
			.doc('rules')
			.get()
			.then(data => {
				setCanEdit(data.data()['canEdit'])
				setIsLoading(false)
			})
	}
	const handleChangeLock = async () => {
		setIsLoading(true)
		await app
			.firestore()
			.collection('auth')
			.doc('rules')
			.get()
			.then(async data => {
				const oldData = data.data()
				await app
					.firestore()
					.collection('auth')
					.doc('rules')
					.set({
						...oldData,
						canEdit: !oldData['canEdit']
					})
				getLock()
			})
	}
	return isLoading ? (
		<Loader backdrop content='đang tải...' vertical />
	) : (
		<Layout
			className='layout'
			style={{ height: '100%', backgroundColor: '#EEECDE' }}
		>
			<Header
				style={{
					backgroundColor: '#EEBE70'
				}}
			>
				<div className='logo' />
				<Menu
					theme='dark'
					mode='horizontal'
					defaultSelectedKeys={['1']}
					style={{
						lineHeight: '64px',
						float: 'right'
					}}
				>
					<Menu.Item
						key='0'
						onClick={handleChangeLock}
						style={{ backgroundColor: '#BF8179', color: '#FFFFFF' }}
					>
						{canEdit ? 'Đóng khóa' : 'Mở khóa'}
					</Menu.Item>
					<Menu.Item
						key='1'
						onClick={() => app.auth().signOut()}
						style={{ backgroundColor: '#FFFFFF', color: '#B37231' }}
					>
						Đăng xuất
					</Menu.Item>
				</Menu>
			</Header>
			<Content
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					padding: '0 50px'
				}}
			>
				<div style={{ overflow: 'auto', width: '100%' }}>
					<Table />
				</div>
			</Content>
			<Footer style={{ textAlign: 'center', backgroundColor: '#EEECDE' }}>
				Designed by Hưng
			</Footer>
		</Layout>
	)
}

export default Home
