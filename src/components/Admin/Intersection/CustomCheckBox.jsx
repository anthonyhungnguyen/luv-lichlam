import React, { useState } from 'react'
import { CheckBox } from 'grommet'
import { Loader } from 'rsuite'
import app from '../../../utils/Base'

const CustomCheckBox = ({ fromName, isChecked, thatSchedule, id }) => {
	const [checked, setChecked] = useState(isChecked)
	const [isLoading, setIsLoading] = useState(false)

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
		setIsLoading(true)
		await app
			.firestore()
			.collection('luv-schedule')
			.doc(thatSchedule.timeRange)
			.get()
			.then(async data => {
				const oldData = data.data()
				const weekDay = getWeekDay(id)
				if (oldData[weekDay].includes(fromName)) {
					const oldDataWithName = data
						.data()
						[weekDay].filter(name => name !== fromName)
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
							[weekDay]: data.data()[weekDay].concat(fromName)
						})
				}
				setIsLoading(false)
			})
	}
	return isLoading ? (
		<Loader backdrop content='đang cập nhật...' vertical />
	) : (
		<CheckBox
			checked={checked}
			onChange={handleOnChange}
			label={fromName}
			style={{ margin: '0.15rem 0' }}
		/>
	)
}

export default CustomCheckBox
