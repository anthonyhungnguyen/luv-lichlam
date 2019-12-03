import React from 'react'
import { TableCell, TableHeader, TableRow } from 'grommet'
const HeaderRow = () => {
	return (
		<TableHeader>
			<TableRow>
				<TableCell scope='col' border='bottom'></TableCell>
				<TableCell scope='col' border='bottom'>
					Thứ hai
				</TableCell>
				<TableCell scope='col' border='bottom'>
					Thứ ba
				</TableCell>
				<TableCell scope='col' border='bottom'>
					Thứ tư
				</TableCell>
				<TableCell scope='col' border='bottom'>
					Thứ năm
				</TableCell>
				<TableCell scope='col' border='bottom'>
					Thứ sáu
				</TableCell>
				<TableCell scope='col' border='bottom'>
					Thử bảy
				</TableCell>
				<TableCell scope='col' border='bottom'>
					Chủ nhật
				</TableCell>
			</TableRow>
		</TableHeader>
	)
}

export default HeaderRow
