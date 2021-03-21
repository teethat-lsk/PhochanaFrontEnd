import React from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import './Input.css';

function Input({ children, ext, placeholder, type }) {
	const [value, setValue] = React.useState(
		type === 'date' ? convertDate(new Date()) : null
	);
	const [openDatePicker, toggleDatePicker] = React.useState(false);
	const onChangeHandle = (e) => {
		setValue(moment(e).format('YYYY-MM-DD'));
		toggleDatePicker(false);
	};

	return (
		<div className='input_container'>
			<div className='input_title'>{children}</div>
			<div className='input_box'>
				{type !== 'combobox' ? (
					<input
						className='input_input'
						placeholder={placeholder || ''}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						type={type || 'input'}
						onClick={() => {
							type === 'date' && toggleDatePicker(!openDatePicker);
						}}
						readonly={type === 'date' ? 'readonly' : false}
					/>
				) : (
					<select className='testt'>
						<option>1</option>
						<option>2</option>
						<option>3</option>
					</select>
				)}
				<div className='input_ext'>{ext}</div>
			</div>
			{openDatePicker && (
				<Calendar
					className='input_calendar'
					maxDate={new Date()}
					locale='th'
					onChange={onChangeHandle}
					value={new Date(value)}
				/>
			)}
		</div>
	);
}
function convertDate(date) {
	var mnth = ('0' + (date.getMonth() + 1)).slice(-2),
		day = ('0' + date.getDate()).slice(-2);
	return [date.getFullYear(), mnth, day].join('-');
}

export default Input;
