import './HomeLogo.css';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo_home.png';

function HomeLogo() {
	return (
		<NavLink className='homelogo_circle' to='/foodphoto'>
			<img className='homelogo_logo' src={logo}></img>
			{/* <div className='homelogo_circle'></div> */}
			<div className='homelogo_arrow arrow1'></div>
			<div className='homelogo_arrow arrow2'></div>
		</NavLink>
	);
}

export default HomeLogo;
