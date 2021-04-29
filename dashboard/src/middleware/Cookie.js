const tokenName = 'supervisor/token';

const getToken = () => {
	return localStorage.getItem(tokenName);
};

const getRole = () => {
	return localStorage.getItem('role');
};

const getUsername = () => {
	return localStorage.getItem('username');
};

const setToken = (token, role, username) => {
	if (token) localStorage.setItem(tokenName, token);
	if (role) localStorage.setItem('role', role);
	if (username) localStorage.setItem('username', username);
};

const removeToken = () => {
	localStorage.removeItem(tokenName);
	localStorage.removeItem('role');
	localStorage.removeItem('username');
};

const isLoggedIn = () => {
	return getToken() !== null;
};

const isAdmin = () => {
	return getRole() === 'Admin';
};

module.exports = {
	getToken,
	setToken,
	removeToken,
	isLoggedIn,
	isAdmin,
	getRole,
	getUsername,
};
