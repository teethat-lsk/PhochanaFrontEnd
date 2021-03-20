import './HomeLogo.css';
import logo from '../../images/logo_home.png';

function HomeLogo() {
	return (
		<div className='homelogo_circle'>
			<img className='homelogo_logo' src={logo}></img>
			{/* <div className='homelogo_circle'></div> */}
			<div className='homelogo_arrow arrow1'></div>
			<div className='homelogo_arrow arrow2'></div>
		</div>
	);
}

export default HomeLogo;
