import react, { useEffect, useState } from 'react';
import { MainHeaderContainer } from '../Main';
import { Link, NavLink } from 'react-router-dom';
import GetImage from '../../middleware/GetImage';
import apiClient from '../../middleware/ApiClient';
import '../../styles/Friends/ManageRequest.css';

// TODO เพิ่มปุ่ม > < เพื่อให้แสดงทีละ 20 User/Page
const ManageFriendRequest = (props) => {
	return (
		<div>
			<MainHeaderContainer
				menu={false}
				backwardTo='/friends'
				title={'Requests'}
				right='addfriend'
				to='/addfriend'
			/>
			{<ManagerFriendRequestBody pageState={props.match.params.pagestate} />}
			<ManagerFriendRequestFooter />
		</div>
	);
};

const ManagerFriendRequestBody = ({ pageState }) => {
	// console.log(pageState);

	const [requests, setRequests] = useState([]);
	const [requestComponent, setRequestComponent] = useState(null);
	const [lastState, setLastState] = useState(pageState);

	useEffect(async () => {
		updateRequest(true);
		return () => {};
	}, []);

	const updateRequest = async (init, state) => {
		let _pageState;
		if (init) _pageState = pageState;
		else {
			// console.log(state, lastState);
			if (state !== lastState) {
				// console.log('doooo');
				_pageState = pageState === 'income' ? 'outcome' : 'income';
				// console.log('updated');
				setLastState(_pageState);
			} else {
				_pageState = pageState;
			}
		}
		// console.log('update request!', init, _pageState);
		var config = {
			method: 'get',
			url: `/friends/${_pageState}?limit=20&skip=0`,
		};
		// console.log(config);
		const res = await apiClient(config);
		try {
			if (res.data.status === 'success' && res.data.message.users.length) {
				// console.log('message res', res.data.message.users);
				setRequests(res.data.message.users);
			} else {
				setRequests([]);
			}
		} catch (err) {}
	};

	useEffect(async () => {
		// console.log('processing');
		// console.log(requests);
		setRequestComponent(
			requests.map((element) => {
				// console.log(element);
				return pageState === 'income' ? (
					<RequestCardIncome
						display_name={element.owner.display_name}
						profile={element.owner.profile}
					/>
				) : (
					<RequestCardOutcome
						display_name={element.target.display_name}
						profile={element.target.url_profile}
						username={element.target.username}
					/>
				);
			})
		);
	}, [requests]);

	return (
		<div className='manager_friend_request_body_container'>
			<div className='manager_friend_request_button'>
				<NavLink
					className='btn_friend_request'
					to='/friends/income'
					activeClassName='bfq_active'
					onClick={() => {
						updateRequest(false, 'income');
					}}
				>
					Income
				</NavLink>
				<NavLink
					className='btn_friend_request'
					to='/friends/outcome'
					activeClassName='bfq_active'
					onClick={() => {
						updateRequest(false, 'outcome');
					}}
				>
					Outcome
				</NavLink>
			</div>
			<div className='manager_friend_request_body'>{requestComponent}</div>
		</div>
	);
};

const RequestCardIncome = ({ profile, display_name, username }) => {
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

const RequestCardOutcome = ({ profile, display_name, username }) => {
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
				<div className='btn_action _wait'>
					<i className='fa fa-clock-o' aria-hidden='true'></i>
				</div>
			</div>
		</div>
	);
};

const ManagerFriendRequestFooter = () => {
	return (
		<Link className='manager_friend_request_footer' to='/myinformation'>
			<p>ข้อมูลของฉัน</p>
		</Link>
	);
};

export { ManageFriendRequest, ManagerFriendRequestFooter };
