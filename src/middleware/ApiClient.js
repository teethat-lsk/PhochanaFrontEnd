import axios from 'axios';
import { backend } from '../config/Url';
import { getToken, setToken, removeToken } from './Cookie';
import { Redirect } from 'react-router-dom';
// request

axios.interceptors.request.use(
	function (config) {
		config = {
			...config,
			url: `${backend}` + config.url,
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
		console.log(response);
		return response;
	},
	function (error) {
		if (error.response.status == 401) {
			alert('Invalid token, please login');
			removeToken();
			window.location.reload();
		}
		return Promise.reject(error);
	}
);

export default axios;
