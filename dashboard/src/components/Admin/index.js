import Navigation from './Navigation';
import Main from './Main';
import Store from './Store';
import Report from './Report';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	useRouteMatch,
} from 'react-router-dom';
import './admin.css';

const Admin = () => {
	let { path, url } = useRouteMatch();

	return (
		<div className='admin_container'>
			<Navigation />
			<div className='admin_body'>
				<Switch>
					{/* <Route path={`${path}/`} exact component={Main}></Route> */}
					<Route path={`${path}/`} component={Store}></Route>
					{/* <Route path={`${path}/reports`} component={Report}></Route> */}
				</Switch>
			</div>
		</div>
	);
};

export default Admin;
