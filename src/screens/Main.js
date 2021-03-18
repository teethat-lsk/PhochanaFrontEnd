import React, { useState, useEffect } from 'react';
import '../styles/main.css';

// icon here https://fontawesome.com/v4.7.0/icons/

function Main() {
	return (
		<div className='main_container'>
			<div className='main_header_container'>Header</div>
			<div className='main_body_container'>body</div>
			<Main_footer_box />
		</div>
	);
}

const Main_footer_box = () => {
	const [notify, setNotify] = useState(0);
	return (
		<div className='main_footer_container'>
			<div className='main_footer_box'>
				<button className='main_footer_button'>
					<i className='fa fa-home' aria-hidden='true'></i>
				</button>
				<button className='main_footer_button'>
					<i className='fa fa-users' aria-hidden='true'></i>
				</button>
				<button className='main_footer_button'>
					<i className='fa fa-book' aria-hidden='true'></i>
				</button>
				<button className='main_footer_button'>
					<i className='fa fa-bolt' aria-hidden='true'></i>
				</button>
				<button
					className='main_footer_button'
					onClick={() => setNotify(notify + 1)}
				>
					<div>
						{notify !== 0 && (
							<div className='number_notify'>{notify}</div>
						)}
						<i className='fa fa-bell' aria-hidden='true'></i>
					</div>
				</button>
			</div>
		</div>
	);
};

export default Main;
