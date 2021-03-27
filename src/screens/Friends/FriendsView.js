import react, { useState, useEffect } from 'react';
import { MainHeaderContainer, MainFooterBox } from '../Main';
import { useLongPress } from '../../middleware/LongPress';
import GetImage from '../../middleware/GetImage';
import '../../styles/Friends/FriendsView.css';

function FriendsView() {
	return (
		<div>
			<MainHeaderContainer title={'Friends'} right='friend' />
			<FriendBody />
			<MainFooterBox />
		</div>
	);
}

const FriendBody = () => {
	const [userData, setUserData] = useState([
		{ profile: 'path/to/profile', display_name: 'test1', score: 1000 },
		{ profile: 'path/to/profile', display_name: 'test2', score: 2000 },
		{ profile: 'path/to/profile', display_name: 'test3', score: 3000 },
		{ profile: 'path/to/profile', display_name: 'test4', score: 4000 },
	]);

	const [search, setSearch] = useState(null);

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
								profile={element.profile}
								display_name={element.display_name}
								score={element.score}
							/>
						);
					})}
			</div>
		</div>
	);
};

const UserCard = ({ profile, display_name, score }) => {
	const [imgProfile, setProfile] = useState(null);
	const [showPopup, togglePopup] = useState(false);

	react.useEffect(async () => {
		const res = await GetImage(profile);
		setProfile(res);
	}, []);

	const longPressProps = useLongPress({
		onClick: (ev) => {
			if (showPopup) togglePopup(!showPopup);
		},
		onLongPress: (ev) => {
			togglePopup(!showPopup);
		},
		ms: 300,
	});

	return (
		<div className='user_card_display' {...longPressProps}>
			<div className='user_profile_box1'>
				<img className='user_profile_img' src={imgProfile} />
				<p className='user_profile_name'>{display_name}</p>
			</div>
			<div className='user_profile_score'>
				<p>{score}</p>
			</div>
			<PopupFriendManager isDisplay={showPopup} />
		</div>
	);
};

const PopupFriendManager = ({ isDisplay }) => {
	return (
		<div
			className={
				'popup_friend_manager_container' +
				(isDisplay === true ? ' popup_show' : ' popup_hide')
			}
		>
			ลบ
		</div>
	);
};

export default FriendsView;
