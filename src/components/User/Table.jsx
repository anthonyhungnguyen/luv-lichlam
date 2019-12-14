import React, { useState, useEffect } from 'react'
import { Table, TableBody } from 'grommet'
import HeaderRow from './Row/HeaderRow'
import Row from './Row/Row'
import app from '../../utils/Base'

const OurTable = () => {
	const [schedules, setSchedules] = useState([])
	useEffect(() => {
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
					setSchedules(orderData(newSchedule))
				})
		}
		fetchData()
	}, [])

	const orderData = schedule => {
		return schedule
			.map(s => {
				switch (s.timeRange) {
					case '8am-3pm':
						return {
							...s,
							id: 0
						}
					case '3pm-10pm':
						return {
							...s,
							id: 1
						}
					case '6pm-10pm':
						return {
							...s,
							id: 2
						}
					default:
						return s
				}
			})
			.sort((a, b) => a.id - b.id)
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
