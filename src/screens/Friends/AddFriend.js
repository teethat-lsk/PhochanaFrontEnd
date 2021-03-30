import react, { useState, useRef } from 'react';
import { ManagerFriendRequestFooter } from './ManageRequest';
import { MainHeaderContainer } from '../Main';
import QrReader from 'react-qr-reader';
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
			{isUsername ? <FindWithUsername /> : <FindWithQRCode />}
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
			<DisplayUser />
		</div>
	);
};

const FindWithQRCode = () => {
	const [result, setResult] = useState('No result');
	const refReader = useRef(null);

	const handleScan = (data) => {
		if (data) {
			console.log(data);
			setResult(data);
		}
	};

	const handleError = (err) => {
		console.error(err);
	};

	const openImageDialog = () => {
		refReader.current.openImageDialog();
	};

	return (
		<div className='find_with_qr_code_container'>
			<QrReader
				legacyMode
				ref={refReader}
				delay={300}
				onError={handleError}
				onScan={handleScan}
				style={{ width: '100%' }}
			/>
			<p>debugger: {result}</p>
			<div className='btn_upload_image' onClick={openImageDialog}>
				เลือกรูป
			</div>
		</div>
	);
};

const DisplayUser = () => {
	return (
		<div className='display_user_container'>
			<img className='display_user_profile_img' src={''} />
			<div className='display_uesr_profile_name'>Here name</div>
			<div className='display_user_action'>Add</div>
		</div>
	);
};

export { AddFriend };
