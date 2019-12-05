import React, { useEffect, useState } from 'react'
import { TableCell } from 'grommet'
import { Loader } from 'rsuite'
import CustomCheckBox from './CustomCheckBox'
import app from '../../../utils/Base'

const Intersection = ({ data, thatSchedule, id }) => {
	const [checkBoxEveryOne, setCheckBoxEveryOne] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		const getAllUsers = async () => {
			setIsLoading(true)
			await app
				.firestore()
				.collection('auth')
				.get()
				.then(data => {
					const convertedData = data.docs.filter(d => d.id !== 'rules')
					const userData = convertedData.map(d => d.data().name)
					setCheckBoxEveryOne(userData)
					setIsLoading(false)
				})
		}
		getAllUsers()
	}, [])

	return (
		<TableCell>
			{isLoading ? (
				<Loader backdrop content='cập nhật...' vertical />
			) : (
				checkBoxEveryOne.map(sname => {
					if (data.includes(sname)) {
						return (
							<CustomCheckBox
								fromName={sname}
								isChecked={true}
								thatSchedule={thatSchedule}
								id={id}
								key={sname.concat(id)}
							/>
						)
					} else {
						return (
							<CustomCheckBox
								fromName={sname}
								isChecked={false}
								thatSchedule={thatSchedule}
								id={id}
								key={sname.concat(id)}
							/>
						)
					}
				})
			)}
		</TableCell>
	)
}

export default Intersection
