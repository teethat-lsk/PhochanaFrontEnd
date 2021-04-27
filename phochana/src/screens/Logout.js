import react, { useEffect } from 'react';
import { removeToken } from '../middleware/Cookie';
import { useHistory } from 'react-router-dom';
import apiClient from '../middleware/ApiClient';
import '../styles/Logout.css';

const Logout = () => {
	const history = useHistory();
	useEffect(async () => {
		const config = {
			method: 'post',
			url: `/users/logout`,
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await apiClient(config);
		console.log(res.data);
		//alert(res.data);
		if (res.data.status === 'success') {
			removeToken();
			history.push('/login');
		}
	}, []);
	return <div className='logout_container'>logout</div>;
};

export default Logout;
