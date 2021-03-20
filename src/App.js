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
import NotFoundPage from './screens/NotFoundPage';
import { isLoggedIn } from './config/Cookie';

const App = () => {
	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route path='/register'>{/* <About /> */}</Route>
					<Route path='/login'>{<Login />}</Route>
					<Route path='/agreement'>
						<Agreement />
					</Route>
					<Route path='/main'>
						{/* {isLoggedIn === true ? <Main /> : <Redirect to='/login' />} */}
						<Main /> {/* disable login */}
					</Route>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='/404'>{NotFoundPage}</Route>
					<Redirect to='/404' />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
