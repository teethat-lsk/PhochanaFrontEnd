import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

// console.warn = console.error = () => {}; // Something bad happened 🌠

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/store' component={Dashboard} />
				<Route path='/login' component={Login} />
				<Redirect to='/store' />
			</Switch>
		</Router>
	);
}

const PrivateRoute = ({ component: Component, ...rest }) => {
	const isLogged = isLoggedIn();

	return (
		<Route
			{...rest}
			render={(props) =>
				isLogged ? (
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

export default App;
