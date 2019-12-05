import React from 'react'
import { Layout, Menu } from 'antd'
import app from '../../utils/Base'
import Table from './Table'

const { Header, Content, Footer } = Layout

const Home = () => {
	return (
		<Layout
			className='layout'
			style={{ height: '100%', backgroundColor: '#EEECDE' }}
		>
			<Header
				style={{
					backgroundColor: '#EEBE70'
				}}
			>
				<Menu
					theme='dark'
					mode='horizontal'
					defaultSelectedKeys={['1']}
					style={{ lineHeight: '64px', float: 'right' }}
				>
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
				Designed by ngph
			</Footer>
		</Layout>
	)
}

export default Home
