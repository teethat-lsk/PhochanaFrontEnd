import react, { useState, useEffect } from 'react';
import { MainHeaderContainer, MainFooterBox } from '../Main';
import { useLongPress } from '../../middleware/LongPress';
import GetImage from '../../middleware/GetImage';
import apiClient from '../../middleware/ApiClient';
import { Link } from 'react-router-dom';
import '../../styles/Friends/FriendsView.css';

function FriendsView() {
	return (
		<div className='fade_effect'>
			<MainHeaderContainer
				title={'Friends'}
				right='friend'
				to='/friends/income'
			/>
			<FriendBody />
			<MainFooterBox />
		</div>
	);
}

const FriendBody = () => {
	const [userData, setUserData] = useState([]);

	const [search, setSearch] = useState(null);

	useEffect(async () => {
		var config = {
			method: 'get',
			url: '/friends?limit=20&skip=0',
		};
		try {
			const res = await apiClient(config);
			if (res.data.status === 'success') {
				if (res.data.message.users.length !== 0) {
					// console.log('have user', res.data.message.users);
					setUserData(res.data.message.users);
				} else {
					// console.log('no have user');
				}
			} else {
				// console.log('something wrong');
			}
		} catch (err) {}
	}, []);

	const searchSpace = (event) => {
		let keyword = event.target.value;
		setSearch(keyword);
		// console.log(keyword);
	};

	return (
		<div className='friend_body_container noselect'>
			<div className='friend_body_search_box'>
				<input className='search_box_input' onChange={searchSpace}></input>
				<div className='search_box_icon'>
					<i className='fa fa-search' aria-hidden='true'></i>
				</div>
			</div>
			<div className='friend_body_display'>
				{userData
					.filter((element) => {
						if (search === null) {
							return element;
						}
						if (
							element.display_name
								.toLowerCase()
								.includes(search.toLowerCase()) ||
							element.display_name.toUpperCase().includes(search.toUpperCase())
						) {
							return element;
						}
					})
					.map((element) => {
						return (
							<UserCard
								profile={element.url_profile}
								display_name={element.display_name}
								score={element.score}
								username={element.username}
							/>
						);
					})}
				{userData.length === 0 && (
					<Link className='friend_body_length_zero' to='/friends/income'>
						<p>ไม่พบรายชื่อเพื่อน</p>
						<p>ค้นหาเพื่อนใหม่?</p>
					</Link>
				)}
			</div>
		</div>
	);
};

const UserCard = ({ profile, display_name, score, username }) => {
	const [imgProfile, setProfile] = useState(null);
	const [showPopup, togglePopup] = useState(false);

	react.useEffect(async () => {
		const res = await GetImage(profile);
		// console.log(res);
		setProfile(res);
	}, [profile]);

	const longPressProps = useLongPress({
		onClick: (ev) => {
			if (showPopup) togglePopup(!showPopup);
			else {
				// console.log('?');
				// return <Link to='test' />;
			}
		},
		onLongPress: (ev) => {
			togglePopup(!showPopup);
		},
		ms: 300,
	});

	return (
		<div className='user_card_display'>
			<Link
				className='user_profile_box1'
				to={'/profile/' + username}
				{...longPressProps}
			>
				<img className='user_profile_img' src={imgProfile} />
				<p className='user_profile_name'>{display_name}</p>
			</Link>
			<div className='user_profile_score'>
				<p>{score}</p>
			</div>
			<PopupFriendManager isDisplay={showPopup} username={username} />
		</div>
	);
};

const PopupFriendManager = ({ isDisplay, username }) => {
	const handleDelete = async () => {
		// console.log('yoo');
		try {
			await DeleteFriend(username);
			window.location.reload();
		} catch (err) {}
	};
	return (
		<div
			className={
				'popup_friend_manager_container' +
				(isDisplay === true ? ' popup_show' : ' popup_hide')
			}
			onClick={() => {
				handleDelete();
			}}
		>
			ลบ
		</div>
	);
};

const DeleteFriend = async (username) => {
	const data = JSON.stringify({
		target: username,
		is_delete: true,
	});
	// console.log(data);

	const config = {
		method: 'put',
		url: '/friends',
		headers: {
			'Content-Type': 'application/json',
		},
		data: data,
	};

	try {
		const res = await apiClient(config);
		if (res.data.status === 'success') {
			return res.data.message;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

export default FriendsView;
