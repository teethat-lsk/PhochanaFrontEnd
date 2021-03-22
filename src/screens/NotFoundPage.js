import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFoundPage.css';
import Input from '../components/Input';

const PageNotFound = () => {
	const [value, setValue] = useState(null);

	const handleOnChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<div className='page_not_found_container'>
			<div className='page_not_found_404'>404</div>
			<div className='page_not_found_msg'>PAGE NOT FOUND :(</div>
			<div className='page_not_found_btn noselect'>
				<Link to='/main'>HOME</Link>
			</div>
		</div>
	);
};

export default PageNotFound;
