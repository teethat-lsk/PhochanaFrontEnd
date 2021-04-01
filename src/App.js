import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./screens/Home";
import Agreement from "./screens/Agreement";
import Login from "./screens/Login";
import { Main } from "./screens/Main";
// Friend zone
import FriendsView from "./screens/Friends/FriendsView";
import { ManageFriendRequest } from "./screens/Friends/ManageRequest";
import { MyInformation } from "./screens/Friends/MyInfomation";
import { AddFriend } from "./screens/Friends/AddFriend";

import { ShowProfile, EditProfile } from "./screens/Profile";
import NotFoundPage from "./screens/NotFoundPage";
import KnowledgeMain from "./screens/Knowledge/KnowledgeMain";
import ExerciseMain from "./screens/Exercise/ExerciseMain";
import { isLoggedIn } from "./middleware/Cookie";

console.warn = console.error = () => {}; // Something bad happened 🌠

const App = () => {
  console.log(`User had been logged ==> ${isLoggedIn()}`);
  return (
    <Router>
      <Switch>
        <PrivateRoute path='/' exact component={Main} />
        <Route path='/home' component={Home}></Route>
        <Route path='/register'>{/* <About /> */}</Route>
        <Route path='/agreement' component={Agreement} />
        <Route path='/login' component={Login} />
        <PrivateRoute
          path='/friends/:pagestate'
          component={ManageFriendRequest}
        />
        <PrivateRoute path='/friends' component={FriendsView} />
        <PrivateRoute path='/myinformation' component={MyInformation} />
        <PrivateRoute path='/addfriend' component={AddFriend} />
        <PrivateRoute
          path='/profile/:username'
          component={(props) => <ShowProfile {...props} />}
        />
        <PrivateRoute path='/knowledge' component={KnowledgeMain} />
        <PrivateRoute path='/exercise' component={ExerciseMain} />
        <PrivateRoute
          path='/editprofile'
          component={(props) => <EditProfile {...props} />}
        />
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
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default App;
