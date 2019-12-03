import React, { useEffect, useState } from 'react'
import { TableCell, CheckBox } from 'grommet'
import app from '../../utils/Base'

const Intersection = ({ data, thatSchedule, id }) => {
	const [checked, setChecked] = useState(false)
	useEffect(() => {
		if (Array.isArray(data) && data.indexOf('Trân') >= 0) {
			setChecked(true)
		}
	}, [])

	const getWeekDay = id => {
		switch (id) {
			case 0:
				return 'thuhai'
			case 1:
				return 'thuba'
			case 2:
				return 'thutu'
			case 3:
				return 'thunam'
			case 4:
				return 'thusau'
			case 5:
				return 'thubay'
			case 6:
				return 'chunhat'
			default:
				return id
		}
	}

	const handleOnChange = async e => {
		setChecked(e.target.checked)
		await app
			.firestore()
			.collection('luv-schedule')
			.doc(thatSchedule.timeRange)
			.get()
			.then(async data => {
				const weekDay = getWeekDay(id)
				const oldData = data.data()
				const oldDataWithName = data
					.data()
					[weekDay].filter(name => name !== 'Trân')
				if (data.data()[weekDay].includes('Trân')) {
					await app
						.firestore()
						.collection('luv-schedule')
						.doc(thatSchedule.timeRange)
						.set({
							...oldData,
							[weekDay]: oldDataWithName
						})
				} else {
					await app
						.firestore()
						.collection('luv-schedule')
						.doc(thatSchedule.timeRange)
						.set({
							...oldData,
							[weekDay]: data.data()[weekDay].concat('Trân')
						})
				}
			})
	}

	return (
		<TableCell>
			<CheckBox checked={checked} onChange={handleOnChange} />
		</TableCell>
	)
}

export default Intersection
