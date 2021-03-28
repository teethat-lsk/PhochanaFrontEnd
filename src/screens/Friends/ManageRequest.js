import react, { useState } from 'react';
import { MainHeaderContainer } from '../Main';
import { Link, NavLink } from 'react-router-dom';
import GetImage from '../../middleware/GetImage';
import '../../styles/Friends/ManageRequest.css';

const ManageFriendRequest = (props) => {
	return (
		<div>
			<MainHeaderContainer
				menu={false}
				backwardTo='/friends'
				title={'Requests'}
				right='friend'
			/>
			{<ManagerFriendRequestBody pageState={props.match.params.pagestate} />}
			<ManagerFriendRequestFooter />
		</div>
	);
};

const ManagerFriendRequestBody = ({ pageState }) => {
	// console.log(pageState);
	const [requests, setRequests] = useState([
		{ username: 'test', display_name: 'yayy' },
		{ username: 'test2', display_name: 'yayy2' },
	]);

	return (
		<div className='manager_friend_request_body_container'>
			<div className='manager_friend_request_button'>
				<NavLink
					className='btn_friend_request'
					to='/friends/income'
					activeClassName='bfq_active'
				>
					Income
				</NavLink>
				<NavLink
					className='btn_friend_request'
					to='/friends/outcome'
					activeClassName='bfq_active'
				>
					Outcome
				</NavLink>
			</div>
			<div className='manager_friend_request_body'>
				{requests.map((element) => {
					return (
						pageState === 'income' && (
							<RequestCard display_name={element.display_name} />
						)
					);
				})}
			</div>
		</div>
	);
};

const RequestCard = ({ profile, display_name, score, username }) => {
	const [imgProfile, setProfile] = useState(null);

	react.useEffect(async () => {
		const res = await GetImage(profile);
		// console.log(res);
		setProfile(res);
	}, [profile]);

	return (
		<div className='friend_request_card_container'>
			<Link className='friend_request_box1' to={'/profile/' + username}>
				<img className='user_profile_img' src={imgProfile} />
				<p className='user_profile_name'>{display_name}</p>
			</Link>
			<div className='btn_action_container'>
				<div className='btn_action _accept'>
					<i className='fa fa-check' aria-hidden='true'></i>
				</div>
				<div className='btn_action _decline'>
					<i className='fa fa-times' aria-hidden='true'></i>
				</div>
			</div>
		</div>
	);
};

const ManagerFriendRequestFooter = () => {
	return (
		<div className='manager_friend_request_footer'>
			<p>ข้อมูลของฉัน</p>
		</div>
	);
};

export { ManageFriendRequest };
