import Navigation from './Navigation';
// import Main from './Main';
import FoodDisplay from './FoodDisplay';
// import Report from './Report';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	useRouteMatch,
} from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
	let { path, url } = useRouteMatch();

	return (
		<div className='dashboard_container'>
			<Navigation />
			<div className='dashboard_body'>
				<Switch>
					{/* <Route path={`${path}/`} exact component={Main}></Route> */}
					<Route path={`${path}/`} component={FoodDisplay}></Route>
					{/* <Route path={`${path}/reports`} component={Report}></Route> */}
				</Switch>
			</div>
		</div>
	);
};

export default Dashboard;
