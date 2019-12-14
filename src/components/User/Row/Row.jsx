import React, { useState, useEffect, useContext } from 'react'
import { TableCell, TableRow } from 'grommet'
import Intersection from '../Intersection/Intersection.jsx'
import { Loader } from 'rsuite'
import app from '../../../utils/Base'
import { AuthContext } from '../../../utils/Auth'
const Row = ({ hour, thatSchedule }) => {
	const { currentUser } = useContext(AuthContext)
	const [data, setData] = useState({})
	const [username, setUsername] = useState('')
	const [canEdit, setCanEdit] = useState()
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		const getUserName = async () => {
			await app
				.firestore()
				.collection('auth')
				.doc(currentUser.uid)
				.get()
				.then(data => {
					setUsername(data.data()['name'])
				})
		}
		const getCanEdit = async () => {
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
		fetchData()
		getUserName()
		getCanEdit()
	}, [])
	const fetchData = () => {
		const thisData = {
			thuhai: [],
			thuba: [],
			thutu: [],
			thunam: [],
			thusau: [],
			thubay: [],
			chunhat: []
		}

		Object.keys(thatSchedule).forEach((item, i) => {
			if (item !== 'timeRange' && item !== 'id') {
				thisData[item] = thatSchedule[item]
			}
		})
		setData(thisData)
	}

	return (
		<TableRow>
			<TableCell scope='row'>
				<strong>{hour}</strong>
			</TableCell>
			{isLoading ? (
				<TableCell>
					<Loader backdrop content='chuyển trang...' vertical />
				</TableCell>
			) : (
				data &&
				Object.keys(data).map((item, key) => (
					<Intersection
						data={data[item]}
						key={key}
						thatSchedule={thatSchedule}
						id={key}
						username={username}
						canEdit={canEdit}
					/>
				))
			)}
		</TableRow>
	)
}

export default Row
