const tokenName = 'user/token';

const getToken = () => {
	return localStorage.getItem(tokenName);
};

const setToken = (token) => {
	if (token) localStorage.setItem(tokenName, token);
};

const removeToken = () => {
	localStorage.removeItem(tokenName);
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
