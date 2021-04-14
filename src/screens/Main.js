import React, { useEffect, useState } from 'react';
import { Link, NavLink, Redirect, useHistory } from 'react-router-dom';
import CalendarFood from '../components/CalendarFood';
import HomeLogo from '../components/HomeLogo';
import { getToken, setToken, removeToken } from '../middleware/Cookie';
import calendarIcon from '../images/calendar.png';
import '../styles/main.css';

// var axios = require('axios');
// icon here https://fontawesome.com/v4.7.0/icons/

function Main() {
	return (
		<div className='main_container'>
			<MainHeaderContainer right={'calendar'} />
			<div className='main_body_container'>
				<HomeLogo />
				<MainScore />
				{/* <CalendarFood /> */}
			</div>
			<MainFooterBox />
		</div>
	);
}

const MainScore = () => {
	const [score, setScore] = useState(1000);
	return (
		<div className='main_score_container'>
			<div style={{ paddingRight: '5px' }}>คะแนนวันนี้ :</div>
			<div>{score} </div>
			<div style={{ paddingLeft: '10px', fontSize: '20px' }}>🚀</div>
		</div>
	);
};

const MainHeaderContainer = ({
	menu = true, // true: menu, false: backward
	backwardTo = '',
	title = 'PhoChana',
	right = 'none',
	to = '/',
}) => {
	const [showMenu, toggleMenu] = useState(false);
	const [menuWidth, setMenuWidth] = useState('0%');
	const history = useHistory();
	const listRight = {
		none: () => {
			return <div></div>;
		},
		calendar: () => {
			return (
				<Link to={to}>
					<img style={{ width: '25px' }} src={calendarIcon} />
				</Link>
			);
		},
		friend: () => {
			return (
				<Link to={to}>
					<i className='fa fa-users' aria-hidden='true' />
				</Link>
			);
		},
		addfriend: () => {
			return (
				<Link to={to}>
					<i className='fa fa-user-plus' aria-hidden='true' />
				</Link>
			);
		},
	};
	// console.log(list[right]);
	const toggleMenuHandle = () => {
		toggleMenu(!showMenu);
		if (!showMenu) setMenuWidth('60%');
		else setMenuWidth('0%');
	};

	return (
		<div className='main_header_container'>
			<Menu widthMenu={menuWidth} toggleMenu={toggleMenuHandle} />
			{menu ? (
				<div className='main_header_left' onClick={toggleMenuHandle}>
					<i className='fa fa-bars' aria-hidden='true'></i>
				</div>
			) : (
				<div
					className='btn_back_ward btn_backward_global'
					onClick={() =>
						backwardTo === '' ? history.goBack() : history.push(backwardTo)
					}
				>
					<i className='fa fa-chevron-circle-left' aria-hidden='true'></i>
					<p style={{ paddingLeft: '5px' }}>back</p>
				</div>
			)}
			<div className='main_header_center noselect'>{title}</div>
			<div className='main_header_right'>{listRight[right]()}</div>
		</div>
	);
};

const Menu = ({ widthMenu, toggleMenu }) => {
	const menuItems = [
		['โปรไฟล์ของฉัน', '/profile/me'],
		['อาหารของฉัน', '/food/'],
		['การออกกำลังกาย', '/ex/'],
		['บาร์โค้ตของฉัน', '/bar/'],
		['ตั้งค่า', '/settings/'],
	];
	return (
		<div
			className='main_menu_container noselect'
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
			{widthMenu === '60%' &&
				menuItems.map((item, key) => {
					return (
						<Link to={item[1]} className='main_menu_item noselect' key={key}>
							<div>{item[0]}</div>
						</Link>
					);
				})}
		</div>
	);
};

const MainFooterBox = () => {
	const [notify, setNotify] = useState(20);
	return (
		<div className='main_footer_container'>
			<div className='main_footer_box'>
				<NavLink
					className='main_footer_button'
					exact
					to='/'
					activeClassName='mfb_active'
				>
					<i
						className='fa fa-home'
						aria-hidden='true'
						style={{ paddingTop: '10px' }}
					></i>
				</NavLink>
				<NavLink
					className='main_footer_button'
					to='/friends'
					activeClassName='mfb_active'
				>
					<i
						className='fa fa-users'
						aria-hidden='true'
						style={{ paddingTop: '10px' }}
					></i>
				</NavLink>
				<NavLink
					className='main_footer_button'
					to='/knowledge'
					activeClassName='mfb_active'
				>
					<i
						className='fa fa-book'
						aria-hidden='true'
						style={{ paddingTop: '10px' }}
					></i>
				</NavLink>
				<NavLink
					className='main_footer_button'
					to='/exercise'
					activeClassName='mfb_active'
				>
					<i
						style={{ paddingTop: '10px' }}
						className='fa fa-bolt'
						aria-hidden='true'
					></i>
				</NavLink>
				<NavLink
					className='main_footer_button'
					onClick={() => setNotify(notify + 1)}
					to='/notification'
					activeClassName='mfb_active'
				>
					<div>
						{notify !== 0 && <div className='number_notify'>{notify}</div>}
						<i
							className='fa fa-bell'
							aria-hidden='true'
							style={{ paddingTop: '10px' }}
						></i>
					</div>
				</NavLink>
			</div>
		</div>
	);
};

export { Main, MainFooterBox, MainHeaderContainer };
