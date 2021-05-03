import react, { useEffect } from 'react';
import { removeToken, getToken } from '../middleware/Cookie';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import apiClient from '../middleware/ApiClient';
import '../styles/Logout.css';

const Logout = () => {
	console.log('logout loaded!');
	const history = useHistory();
	useEffect(async () => {
		if (getToken()) {
			const config = {
				method: 'post',
				url: `/users/logout`,
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const res = await apiClient(config);
			// console.log(res.data);
			//alert(res.data);
			if (res.data.status === 'success') {
				history.push('/login');
			} else {
				history.push('/login');
			}
			removeToken();
		}
	}, []);
	return <div className='logout_container fade_effect'>logout</div>;
};

export default withRouter(Logout);
