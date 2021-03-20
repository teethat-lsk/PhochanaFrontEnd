import React, { useState } from 'react';
import '../styles/main.css';
import CalendarFood from '../components/CalendarFood';
import HomeLogo from '../components/HomeLogo';
import { getToken, setToken, removeToken } from '../config/Cookie';

// var axios = require('axios');
// icon here https://fontawesome.com/v4.7.0/icons/

function Main() {
	// var config = {
	// 	method: 'get',
	// 	url: 'http://localhost:5000/images/kookza01.jpg',
	// 	headers: {
	// 		authorization:
	// 			'83843cd278ec2122822eaf043e378c8a74b6e4505fc97a62ebf83b4601f8fcd8047bf6421b40f0b36088a4eb7a200615',
	// 	},
	// };
	// const [imgSrc, setImgSrc] = useState(null);
	// useEffect(async () => {
	// 	const res = await axios(config);
	// 	setImgSrc(res.data);
	// }, []);

	return (
		<div className='main_container'>
			<MainHeaderContainer />
			<div className='main_body_container'>
				<HomeLogo />
				{/* <CalendarFood /> */}
			</div>
			<MainFooterBox />
		</div>
	);
}

const MainHeaderContainer = () => {
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
		<div className='main_menu_container' style={{ width: widthMenu || '0%' }}>
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
					<a href={item} className='main_menu_item noselect' key={key}>
						{item}
					</a>
				);
			})}
		</div>
	);
};

const MainFooterBox = () => {
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
						{notify !== 0 && <div className='number_notify'>{notify}</div>}
						<i className='fa fa-bell' aria-hidden='true'></i>
					</div>
				</button>
			</div>
		</div>
	);
};

export default Main;
