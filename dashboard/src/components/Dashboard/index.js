import Navigation from './Navigation';
import FoodDisplay from './FoodDisplay';
import './dashboard.css';

const Dashboard = () => {
	return (
		<div className='dashboard_container'>
			<Navigation />
			<div className='dashboard_body'>
				<FoodDisplay />
			</div>
		</div>
	);
};

export default Dashboard;
