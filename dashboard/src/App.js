import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import react, { useEffect, useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import { isLoggedIn, isAdmin } from './middleware/Cookie';
import './App.css';

// console.warn = console.error = () => {}; // Something bad happened 🌠

function App() {
	console.log(isAdmin());
	return (
		<Router>
			<Switch>
				<StoreRoute path='/store' component={Dashboard} />
				<AdminRoute path='/admin' component={Admin} />
				<Route path='/login' component={Login} />
				<Redirect to='/store'></Redirect>
			</Switch>
		</Router>
	);
}

const StoreRoute = ({ component: Component, ...rest }) => {
	const _isLogged = isLoggedIn();

	return (
		<Route
			{...rest}
			render={(props) =>
				_isLogged ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: '/login', state: { from: props.location } }}
					/>
				)
			}
		/>
	);
};

const AdminRoute = ({ component: Component, ...rest }) => {
	const _isAdmin = isAdmin();
	const _isLogin = isLoggedIn();
	return (
		<Route
			{...rest}
			render={(props) =>
				_isAdmin ? (
					<Component {...props} />
				) : _isLogin ? (
					<Redirect
						to={{ pathname: '/store', state: { from: props.location } }}
					/>
				) : (
					<Redirect
						to={{ pathname: '/login', state: { from: props.location } }}
					/>
				)
			}
		/>
	);
};

export default App;
