import React, { useEffect, useState } from 'react'
import { TableCell, CheckBox } from 'grommet'
import { Loader, Alert } from 'rsuite'
import app from '../../../utils/Base'

const Intersection = ({ data, thatSchedule, id, username, canEdit }) => {
	const [checked, setChecked] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		if (Array.isArray(data) && data.indexOf(username) >= 0 && username !== '') {
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
		if (canEdit) {
			setChecked(e.target.checked)
			setIsLoading(true)
			await app
				.firestore()
				.collection('luv-schedule')
				.doc(thatSchedule.timeRange)
				.get()
				.then(async data => {
					const weekDay = getWeekDay(id)
					const oldData = data.data()
					if (data.data()[weekDay].includes(username)) {
						const oldDataWithName = data
							.data()
							[weekDay].filter(name => name !== username)
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
								[weekDay]: data.data()[weekDay].concat(username)
							})
					}
					setIsLoading(false)
				})
		} else {
			Alert.warning('Không thể cập nhật do đã khóa')
		}
	}

	return (
		<TableCell>
			{isLoading ? (
				<Loader backdrop content='đang cập nhật...' vertical />
			) : (
				<CheckBox checked={checked} onChange={handleOnChange} />
			)}
		</TableCell>
	)
}

export default Intersection
