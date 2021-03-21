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
	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route path='/register'>{/* <About /> */}</Route>
					<Route path='/login' component={Login} />
					<Route path='/agreement' component={Agreement} />
					<Route path='/main' component={Main} />
					<Route exact path='/' component={Home} />
					<Route
						path='/profile/:username'
						component={(props) => <Profile {...props} displayProfile={true} />}
					/>
					<Route
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

export default App;
