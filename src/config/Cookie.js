const getToken = () => {
	return localStorage.getItem('token');
};

const setToken = (token) => {
	if (token) localStorage.setItem('token', token);
};

const removeToken = () => {
	localStorage.removeItem('token');
};

const isLoggedIn = () => {
	return getToken() !== null;
};

module.exports = {
	getToken,
	setToken,
	removeToken,
	isLoggedIn,
};
