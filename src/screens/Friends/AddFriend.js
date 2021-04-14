import react, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ManagerFriendRequestFooter } from './ManageRequest';
import { MainHeaderContainer } from '../Main';
import apiClient from '../../middleware/ApiClient';
import QrReader from 'react-qr-reader';
import GetImage from '../../middleware/GetImage';
import { frontend } from '../../config';
import '../../styles/Friends/AddFriend.css';

const AddFriend = (props) => {
	const usernameToFind = props.match.params.username || null;
	console.log('username =>', usernameToFind);
	return (
		<div>
			<MainHeaderContainer menu={false} title={'New Request'} />
			<AddFriendBody usernameToFind={usernameToFind} />
			<ManagerFriendRequestFooter />
		</div>
	);
};

const AddFriendBody = ({ usernameToFind }) => {
	// console.log('body updated!');
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
			{isUsername ? (
				<FindWithUsername usernameToFind={usernameToFind} />
			) : (
				<FindWithQRCode />
			)}
		</div>
	);
};

const FindWithUsername = ({ usernameToFind }) => {
	// console.log('find with username had been updated!');
	// console.log(usernameToFind);

	const [value, setValue] = useState(usernameToFind || '');
	const [userdata, setUserdata] = useState(null);
	const [type, setType] = useState(null);
	const [error, setError] = useState('');

	const handleOnChange = (event) => {
		setValue(event.target.value);
	};

	const handleOnSubmit = async (event) => {
		// console.log('do');
		if (value != '') {
			// console.log('yayy you can submit');
			const res = await getInfo(value);

			if (res) {
				setUserdata(res.user);
				if (res.type === 'new') {
					setType(res.type);
				} else if (
					res.is_accept === false &&
					res.is_decline === false &&
					res.is_delete === false
				) {
					setType('wait');
				} else if (
					res.is_accept === true &&
					res.is_decline === false &&
					res.is_delete === false
				) {
					setType('profile');
				}
				console.log('found!', res);
				setError('');
			} else {
				// console.log('user not found!');
				setError('User not found!');
			}
		}
	};

	useEffect(() => {
		if (usernameToFind) {
			handleOnSubmit();
		}
	}, [usernameToFind]);

	return (
		<div className='find_with_username_container'>
			<div className='textbox_input_container'>
				<input
					className='textbox_input'
					type='input'
					value={value}
					onChange={handleOnChange}
				></input>
				<div className='icon_here' onClick={handleOnSubmit}>
					<i className='fa fa-search' aria-hidden='true'></i>
				</div>
			</div>
			{(userdata || error) && (
				<DisplayUser
					message={error != '' && error}
					profile={userdata && userdata.url_profile}
					display_name={userdata && userdata.display_name}
					username={userdata && userdata.username}
					type={type}
				/>
			)}
		</div>
	);
};

const FindWithQRCode = () => {
	const history = useHistory();

	const [result, setResult] = useState('No result');
	const refReader = useRef(null);

	const handleScan = (data) => {
		if (data) {
			// console.log(data);
			if (data.startsWith(`${frontend}/addfriend/`)) {
				setResult(data);
				history.push(`/addfriend/` + data.split('/').slice(-1).pop());
				window.location.reload();
			} else {
				// TODO alert here
				console.log('Invalid QRCode');
			}
		}
	};

	const handleError = (err) => {
		// console.error(err);
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

const DisplayUser = ({ profile, display_name, username, message, type }) => {
	// console.log('updated!!!!!!');

	const [loading, setLoading] = useState(false);
	const [imgProfile, setProfile] = useState('');

	useEffect(async () => {
		const temp = await GetImage(profile);
		// console.log(temp);
		setProfile(temp);
	}, [profile]);

	const handleSubmit = async () => {
		// console.log(loading);
		if (!loading) {
			setLoading(true);
			let res = null;

			switch (type) {
				case 'new': {
					// console.log('new !');
					res = await createRequest(username);
					if (res.msg === 'created a new request successfully') {
						console.log('create successfully');
					} else {
						console.log('duplicate request');
					}
					// console.log(res);
					break;
				}
				case 'wait': {
					console.log('wait');
					break;
				}
				case 'profile': {
					console.log('profile');
					break;
				}
			}
			setLoading(false);
		}
	};

	// console.log(profile, display_name, message);
	return (
		<div className='display_user_container'>
			{message == '' ? (
				<div className='display_user_sub'>
					<img className='display_user_profile_img' src={imgProfile} />
					<div className='display_uesr_profile_name'>{display_name}</div>
					{type === 'new' && (
						<div className='display_user_action' onClick={handleSubmit}>
							<i className='fa fa-user-plus' aria-hidden='true'></i>
						</div>
					)}
					{type === 'wait' && (
						<div className='display_user_action' onClick={handleSubmit}>
							<i className='fa fa-clock-o' aria-hidden='true'></i>
						</div>
					)}
					{type === 'profile' && (
						<div className='display_user_action' onClick={handleSubmit}>
							<i className='fa fa-user' aria-hidden='true'></i>
						</div>
					)}
				</div>
			) : (
				<div className='display_user_not_found'>User not found</div>
			)}
		</div>
	);
};

const getInfo = async (username) => {
	const config = {
		method: 'get',
		url: `/friend?target=${username}`,
		headers: {
			'Content-Type': 'application/json',
		},
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

const createRequest = async (username) => {
	var data = JSON.stringify({
		target: username,
	});

	const config = {
		method: 'post',
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

export { AddFriend };
