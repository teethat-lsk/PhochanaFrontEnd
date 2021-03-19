import React, { useState, useEffect } from 'react';
import '../styles/main.css';

// icon here https://fontawesome.com/v4.7.0/icons/

function Main() {
	return (
		<div className='main_container'>
			<Main_header_container />
			<div className='main_body_container'></div>
			<Main_footer_box />
		</div>
	);
}

const Main_header_container = () => {
	const [showMenu, toggleMenu] = useState(false);
	const [menuWidth, setMenuWidth] = useState('0%');
	const toggleMenuHandle = () => {
		toggleMenu(!showMenu);
		if (!showMenu) setMenuWidth('60%');
		else setMenuWidth('0%');
	};

	return (
		<div className='main_header_container'>
			<Menu widthMenu={menuWidth} toggleMenu={toggleMenuHandle} />
			<div className='main_header_left' onClick={toggleMenuHandle}>
				<i className='fa fa-bars' aria-hidden='true'></i>
			</div>
			<div className='main_header_center noselect'>PhoChana</div>
			<div className='main_header_right'>
				<i className='fa fa-calendar' aria-hidden='true'></i>
			</div>
		</div>
	);
};

const Menu = ({ widthMenu, toggleMenu }) => {
	const menuItems = ['A', 'B', 'C', 'D'];
	return (
		<div
			className='main_menu_container'
			style={{ width: widthMenu || '0%' }}
		>
			<div
				className='main_menu_item'
				style={{
					borderBottom: '0px',
					textAlign: 'right',
					fontSize: '5vw',
				}}
				onClick={toggleMenu}
			>
				<i className='fa fa-times' aria-hidden='true'></i>
			</div>
			{menuItems.map((item, key) => {
				return (
					<a className='main_menu_item noselect' key={key}>
						{item}
					</a>
				);
			})}
		</div>
	);
};

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
