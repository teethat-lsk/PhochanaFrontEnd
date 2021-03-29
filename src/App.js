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
import FriendsView from "./screens/Friends/FriendsView";
import { ManageFriendRequest } from "./screens/Friends/ManageRequest";

import { ShowProfile, EditProfile } from './screens/Profile';
import NotFoundPage from './screens/NotFoundPage';
import KnowledgeMain from './screens/Knowledge/KnowledgeMain';
import { isLoggedIn } from './middleware/Cookie';

console.warn = console.error = () => {}; // Something bad happened 🌠

const App = () => {
<<<<<<< HEAD
  console.log(`User had been logged ==> ${isLoggedIn()}`);
  return (
    <Router>
      <div className='App'>
        <Switch>
          <PrivateRoute exact path='/' component={Main} />
          <Route path='/home' component={Home}></Route>
          <Route path='/register'>{/* <About /> */}</Route>
          <Route path='/agreement' component={Agreement} />
          <PrivateRoute
            path='/friends/:pagestate'
            component={ManageFriendRequest}
          />
          <Route path='/login' component={Login} />
          <PrivateRoute path='/friends' component={FriendsView} />
          <PrivateRoute path='/books' component={KnowledgeMain} />
          <PrivateRoute
            path='/profile/:username'
            component={(props) => <ShowProfile {...props} />}
          />
          <PrivateRoute
            path='/editprofile'
            component={(props) => <EditProfile {...props} />}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
=======
	console.log(`User had been logged ==> ${isLoggedIn()}`);
	return (
		<Router>
			<div className='App'>
				<Switch>
					<PrivateRoute exact path='/' component={Main} />
					<Route path='/home' component={Home}></Route>
					<Route path='/register'>{/* <About /> */}</Route>
					<Route path='/agreement' component={Agreement} />
					<PrivateRoute
						path='/friends/:pagestate'
						component={ManageFriendRequest}
					/>
					<Route path='/login' component={Login} />
					<PrivateRoute path='/friends' component={FriendsView} />
					<PrivateRoute
						path='/profile/:username'
						component={(props) => <ShowProfile {...props} />}
					/>
					<PrivateRoute
						path='/editprofile'
						component={(props) => <EditProfile {...props} />}
					/>
					<PrivateRoute to='/knowledge' component={KnowledgeMain} />
					<Route path='*' component={NotFoundPage} />
				</Switch>
			</div>
		</Router>
	);
>>>>>>> 692460d018c2a016e37bf765846edc60bcd605cc
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
					<Redirect to={{ pathname: '/', state: { from: props.location } }} />
				)
			}
		/>
	);
};

export default App;
