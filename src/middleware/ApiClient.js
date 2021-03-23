import axios from 'axios';
import { backend } from '../config';
import { getToken, setToken, removeToken } from './Cookie';

// request
axios.interceptors.request.use(
	function (config) {
		config = {
			...config,
			url: `${backend}/api/v1` + config.url,
			headers: {
				...config.headers,
				Authorization: getToken(),
			},
		};
		// console.log('Request have been modified', config);
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	function (response) {
		// console.log(response.data);
		return response;
	},
	function (error) {
		try {
			if (error.response.status == 401) {
				alert('Invalid token, please login');
				removeToken();
				window.location.reload();
			}
		} catch (err) {
			console.log('fetch backend fail :(');
		}
		return Promise.reject(error);
	}
);

export default axios;
