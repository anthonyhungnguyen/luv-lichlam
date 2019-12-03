import React, { useState, useEffect } from 'react'
import { TableCell, TableRow } from 'grommet'
import Intersection from '../Intersection/Intersection.jsx'
const Row = ({ hour, thatSchedule }) => {
	const [data, setData] = useState({})
	useEffect(() => {
		fetchData()
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
			if (item !== 'timeRange') {
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
			{data &&
				Object.keys(data).map((item, key) => (
					<Intersection
						data={data[item]}
						key={key}
						thatSchedule={thatSchedule}
						id={key}
					/>
				))}
		</TableRow>
	)
}

export default Row
