import react, { useState, useRef } from 'react';
import { ManagerFriendRequestFooter } from './ManageRequest';
import { MainHeaderContainer } from '../Main';
import '../../styles/Friends/AddFriend.css';

const AddFriend = () => {
	return (
		<div>
			<MainHeaderContainer menu={false} title={'New Request'} />
			<AddFriendBody />
			<ManagerFriendRequestFooter />
		</div>
	);
};

const AddFriendBody = () => {
	const [isUsername, Toggle] = useState(true);
	const ref1 = useRef(null);
	const ref2 = useRef(null);

	const toggleHandle = (event) => {
		Toggle(event.target.value === 'username');
	};

	return (
		<div className='add_friend_body_container'>
			<div className='add_friend_body_header' onChange={toggleHandle}>
				<div className='input_checkbox_container'>
					<input
						className='add_friend_input_choice'
						type='radio'
						value='username'
						ref={ref1}
						checked={isUsername}
					/>
					<div
						onClick={() => {
							ref1.current.click();
						}}
					>
						Username
					</div>
				</div>
				<div className='input_checkbox_container'>
					<input
						className='add_friend_input_choice'
						type='radio'
						value='qrcode'
						checked={!isUsername}
						ref={ref2}
					/>
					<div
						onClick={() => {
							ref2.current.click();
						}}
					>
						QRcode
					</div>
				</div>
			</div>

			<FindWithUsername />
		</div>
	);
};

const FindWithUsername = () => {
	return (
		<div className='find_with_username_container'>
			<div className='textbox_input_container'>
				<input className='textbox_input' type='input'></input>
				<div className='icon_here'>
					<i className='fa fa-search' aria-hidden='true'></i>
				</div>
			</div>
		</div>
	);
};

export { AddFriend };
