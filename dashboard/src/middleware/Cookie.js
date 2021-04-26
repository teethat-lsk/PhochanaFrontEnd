const tokenName = 'supervisor/token';

const getToken = () => {
	return localStorage.getItem(tokenName);
};

const getRole = () => {
	return localStorage.getItem('role');
};

const setToken = (token, role) => {
	if (token) localStorage.setItem(tokenName, token);
	if (role) localStorage.setItem('role', role);
};

const removeToken = () => {
	localStorage.removeItem(tokenName);
	localStorage.removeItem('role');
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
};
