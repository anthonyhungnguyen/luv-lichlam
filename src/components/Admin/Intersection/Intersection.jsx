import React from 'react'
import { TableCell } from 'grommet'
import CustomCheckBox from './CustomCheckBox'

const Intersection = ({ data, thatSchedule, id }) => {
	const checkBoxEveryOne = ['Trân', 'Tuấn', 'Duyên', 'Trâm', 'Trinh', 'Huyền']
	return (
		<TableCell>
			{checkBoxEveryOne.map(sname => {
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
			})}
		</TableCell>
	)
}

export default Intersection
