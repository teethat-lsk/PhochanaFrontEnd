import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Home from './screens/Home';
import Agreement from './screens/Agreement';
import Login from './screens/Login';
import { Main } from './screens/Main';
// Friend zone
import FriendsView from './screens/Friends/FriendsView';
import { ManageFriendRequest } from './screens/Friends/ManageRequest';
import { MyInformation } from './screens/Friends/MyInfomation';
import { AddFriend } from './screens/Friends/AddFriend';

import { ShowProfile, EditProfile } from './screens/Profile';
import NotFoundPage from './screens/NotFoundPage';
import KnowledgeMain from './screens/Knowledge/KnowledgeMain';
import ExerciseMain from './screens/Exercise/ExerciseMain';
import PhotoFood from './screens/FoodPhoto';
import Register from './screens/Register';
import Logout from './screens/Logout';
import { isLoggedIn } from './middleware/Cookie';

console.warn = console.error = () => {}; // Something bad happened 🌠

const App = () => {
	console.log(`User had been logged ==> ${isLoggedIn()}`);
	return (
		<Router>
			<Switch>
				<PrivateRoute path='/' exact component={Main} />
				<Route path='/home' component={Home}></Route>
				<Route path='/register' component={Register}></Route>
				<Route path='/agreement' component={Agreement} />
				<Route path='/login'>
					{isLoggedIn() ? <Redirect to='/' /> : <Login />}
				</Route>
				<PrivateRoute path='/logout' component={Logout} />
				<PrivateRoute
					path='/friends/:pagestate'
					component={ManageFriendRequest}
				/>
				<PrivateRoute path='/friends' component={FriendsView} />
				<PrivateRoute path='/myinformation' component={MyInformation} />
				<PrivateRoute path='/exercise' component={ExerciseMain} />
				<PrivateRoute
					path='/addfriend/:username?'
					component={(props) => <AddFriend {...props} />}
				/>
				<PrivateRoute
					path='/profile/:username'
					component={(props) => <ShowProfile {...props} />}
				/>
				<PrivateRoute path='/knowledge' component={KnowledgeMain} />
				<PrivateRoute
					path='/editprofile'
					component={(props) => <EditProfile {...props} />}
				/>
				<PrivateRoute path='/foodphoto' component={PhotoFood} />
				<Route path='/404' component={NotFoundPage} />
				<Redirect to='/404' />
			</Switch>
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
