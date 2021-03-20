import Calendar from 'react-calendar';
import { useState } from 'react';
import './CalendarFood.css';
import moment from 'moment';

function CalendarFood() {
	const mark = ['04-03-2021', '03-03-2021', '05-03-2021'];
	const mark2 = ['09-03-2021', '12-03-2021', '17-03-2021'];
	const onChangeHandle = (e) => {
		console.log(e);
	};
	return (
		<div>
			<Calendar
				onChange={onChangeHandle}
				maxDate={new Date()}
				locale='th'
				tileClassName={({ date, view }) => {
					if (
						mark.find(
							(x) => x === moment(date).format('DD-MM-YYYY')
						)
					) {
						return 'highlight1';
					} else if (
						mark2.find(
							(x) => x === moment(date).format('DD-MM-YYYY')
						)
					) {
						return 'highlight2';
					}
				}}
			/>
		</div>
	);
}

export default CalendarFood;
