import axios from 'axios';
import { backend } from '../config/Url';
import { getToken, setToken } from './Cookie';
// request

axios.interceptors.request.use(
	function (config) {
		config = {
			...config,
			url: `${backend}` + config.url,
			headers: {
				...config.headers,
				Authorization: getToken(),
				'Content-Type': 'application/json',
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
		return response;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export default axios;
