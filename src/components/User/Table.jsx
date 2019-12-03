import React, { useState, useEffect } from 'react'
import { Table, TableBody } from 'grommet'
import HeaderRow from './Row/HeaderRow'
import Row from './Row/Row'
import app from '../../utils/Base'

const OurTable = () => {
	const [schedules, setSchedules] = useState([])
	useEffect(() => {
		fetchData()
	}, [])
	const fetchData = async () => {
		await app
			.firestore()
			.collection('luv-schedule')
			.get()
			.then(data => {
				const newSchedule = data.docs.map(doc => ({
					...doc.data(),
					timeRange: doc.id
				}))
				setSchedules(newSchedule)
			})
	}
	return (
		<Table>
			<HeaderRow />
			<TableBody>
				{schedules.map(schedule => (
					<Row
						hour={schedule.timeRange}
						key={schedule.timeRange}
						thatSchedule={schedule}
					/>
				))}
			</TableBody>
		</Table>
	)
}

export default OurTable
