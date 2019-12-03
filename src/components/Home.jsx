import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import app from '../utils/Base'
import Table from './Table'

const { Header, Content, Footer } = Layout

const Home = () => {
	return (
		<Layout className='layout' style={{ height: '100%' }}>
			<Header>
				<div className='logo' />
				<Menu
					theme='dark'
					mode='horizontal'
					defaultSelectedKeys={['1']}
					style={{ lineHeight: '64px', float: 'right' }}
				>
					<Menu.Item key='1' onClick={() => app.auth().signOut()}>
						Đăng xuất
					</Menu.Item>
				</Menu>
			</Header>
			<Content
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<div style={{ overflowX: 'scroll' }}>
					<Table />
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>Designed by Phuc Hung</Footer>
		</Layout>
	)
}

export default Home
