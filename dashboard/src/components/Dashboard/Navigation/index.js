import react, { useState } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import './navigation.css';

const Navigation = () => {
	let { path, url } = useRouteMatch();

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
				<NavLink
					to={`${url}`}
					exact
					className='btn_navigation_left'
					activeClassName='btn_n_l_active'
				>
					<i className='fa fa-home' aria-hidden='true'></i>
				</NavLink>
				<NavLink
					to={`${url}/foods`}
					className='btn_navigation_left'
					activeClassName='btn_n_l_active'
				>
					<i className='fa fa-cutlery' aria-hidden='true'></i>
				</NavLink>
				<NavLink
					to={`${url}/reports`}
					className='btn_navigation_left'
					activeClassName='btn_n_l_active'
				>
					<i className='fa fa-flag' aria-hidden='true'></i>
				</NavLink>
			</div>
		</div>
	);
};

export default Navigation;
