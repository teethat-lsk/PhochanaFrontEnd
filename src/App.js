import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Home from './screens/Home';
import Agreement from './screens/Agreement';
import Login from './screens/Login';
import Main from './screens/Main';
import Profile from './screens/Profile';
import NotFoundPage from './screens/NotFoundPage';
import { isLoggedIn } from './middleware/Cookie';

console.warn = console.error = () => {}; // Something bad happened 🌠

const App = () => {
	console.log(`User had been logged ==> ${isLoggedIn()}`);
	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route path='/register'>{/* <About /> */}</Route>
					<Route path='/agreement' component={Agreement} />
					<Route path='/login' component={Login} />
					<PrivateRoute path='/main' component={Main} />
					<PrivateRoute
						path='/profile/:username'
						component={(props) => <Profile {...props} displayProfile={true} />}
					/>
					<PrivateRoute
						path='/editprofile'
						component={(props) => <Profile {...props} displayProfile={false} />}
					/>
					<Route path='/404'>{<NotFoundPage />}</Route>
					<Redirect to='/404' />
				</Switch>
			</div>
		</Router>
	);
};

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
