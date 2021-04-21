import react, { useState } from 'react';
import './navigation.css';

const Navigation = () => {
	const [title, setTitle] = useState('จัดการเมนูอาหาร');
	const [username, setUsername] = useState('kookzaza');
	return (
		<div className='navigation_container'>
			<div className='navigation_top_container'>
				<div className='logout_button noselect'>Logout</div>
				<div className='username_display'>{username}</div>
				<div className='header_title'>{title}</div>
			</div>
			<div className='navigation_left_container noselect'>
				<div className='btn_navigation_left'>A</div>
				<div className='btn_navigation_left'>B</div>
				<div className='btn_navigation_left'>C</div>
			</div>
		</div>
	);
};

export default Navigation;
