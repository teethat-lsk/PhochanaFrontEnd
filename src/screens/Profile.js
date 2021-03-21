import react, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../middleware/ApiClient';
import calendarIcon from '../images/calendar.png';
import friendsIcon from '../images/chat.png';
import cupIcon from '../images/cup.png';
import excerciseIcon from '../images/excercise.png';
import GetImage from '../middleware/GetImage';
import Input from '../components/Input';
import '../styles/profile.css';

function Profile(props) {
	const username = props.match.params.username || 'me';
	const [userData, setUserData] = useState({
		username: null,
		displayname: 'hello world',
		weight: 0,
		bmi: 0,
		height: 0,
		bmr: 0,
		imgpath: null,
	});
	const [displayProfile, toggleDisplay] = useState(props.displayProfile);

	useEffect(async () => {
		const res = await getUserProfile(username);
		// alert(username + res);
		// console.log(res.userprofile);

		if (res) {
			const img = await GetImage(res.urlprofile);
			const age = getYears(res.birthday);

			// BMR Calculator
			let BMR = 0;
			if (res.gender === 'G') {
				BMR = 65 + 9.6 * res.weight + 1.8 * res.height - 4.7 * age;
			} else if (res.gender === 'B') {
				BMR = 66 + 13.7 * res.weight + 5 * res.height - 6.8 * age;
			}

			// console.log(BMR);

			// BMI Calculator
			let BMI = (
				res.weight /
				((res.height / 100) * (res.height / 100))
			).toFixed(1);

			setUserData({
				...userData,
				username: res.username,
				displayname: res.displayname,
				imgpath: img,
				height: res.height,
				weight: res.weight,
				bmi: BMI,
				bmr: BMR,
			});
		}
	}, []);

	const handleToggle = () => {
		toggleDisplay(!displayProfile);
	};

	return (
		<div
			className={
				'profile_container noselect ' + (displayProfile ? ' c1' : 'c2')
			}
		>
			<div className='profile_navigation_container'>
				<Link className='btn_back_ward' to='/main'>
					<i className='fa fa-chevron-circle-left' aria-hidden='true'></i>
					<p style={{ paddingLeft: '5px' }}>หน้าหลัก</p>
				</Link>
			</div>
			<div>
				{displayProfile ? (
					<ShowProfile userData={userData} toggleDisplay={handleToggle} />
				) : (
					<EditProfile userData={userData} toggleDisplay={handleToggle} />
				)}
			</div>
		</div>
	);
}

const ShowProfile = ({ userData, toggleDisplay }) => {
	return (
		<div className='profile_container'>
			<ProfileHeader userData={userData} toggleDisplay={toggleDisplay} />
			<div className='profile_body_container'>
				<Shortcut_Box />
			</div>
		</div>
	);
};

const EditProfile = ({ userData, toggleDisplay }) => {
	console.log(userData);
	return (
		<div className='edit_profile_container'>
			<div className='edit_profile_header'>
				<img
					style={{ height: '130px', weight: '130px' }}
					className='profile_picture'
					src={userData.imgpath}
				/>
				<div className='edit_profile_header_btn'>
					<div className='edit_profile_header_box'>{userData.displayname}</div>
					<div style={{ fontSize: '14px', paddingTop: '10px' }}>
						Change profile picture
					</div>
				</div>
			</div>
			<div className='edit_profile_body'>
				<Input>ชื่อที่ใช้แสดง</Input>
				<Input type='number' ext='kg.'>
					น้ำหนัก
				</Input>
				<Input type='number' ext='m.'>
					ส่วนสูง
				</Input>
				<Input type='date'>วันเดือนปีเกิด</Input>
				<Input type='combobox'></Input>
			</div>
			<div className='edit_profile_footer'>3</div>
		</div>
	);
};

const ProfileHeader = ({ userData, toggleDisplay }) => {
	return (
		<div className='profile_header_container'>
			<div className='profile_header_sec1'>
				<div className='profile_sec1_1'>
					<div className='profile_weight_val'>{userData.weight}</div>
					<div className='profile_weight_title'>น้ำหนัก</div>
				</div>
				<div className='profile_sec1_2'>
					<div className='profile_weight_val'>{userData.bmi}</div>
					<div className='profile_weight_title'>BMI</div>
				</div>
			</div>
			<div className='profile_header_sec2'>
				<img
					className='profile_picture'
					src={userData.imgpath}
					style={{ width: '200px', height: '200px' }}
				/>
				<div style={{ fontSize: '16px' }}>{userData.displayname}</div>
			</div>
			<div className='profile_header_sec3'>
				<div className='profile_sec1_1'>
					<div className='profile_weight_val'>{userData.height}</div>
					<div className='profile_weight_title'>ส่วนสูง</div>
				</div>
				<div className='profile_sec1_2'>
					<div className='profile_weight_val'>{userData.bmr}</div>
					<div className='profile_weight_title'>BMR</div>
				</div>
			</div>
			<div className='profile_header_sec4'>
				<Link className='profile_edit_btn' to='/editprofile'>
					<i className='fa fa-pencil' aria-hidden='true' />
					<p style={{ paddingLeft: '5px' }}>Edit</p>
				</Link>
			</div>
		</div>
	);
};

const Shortcut_Box = () => {
	const items = [
		[cupIcon, '/cup/'],
		[calendarIcon, '/Calendar/'],
		[friendsIcon, '/friends/'],
		[excerciseIcon, '/excercises/'],
	];
	return (
		<div className='shortcut_box_container'>
			{items.map((item, key) => {
				return (
					<Link className='shortcut_item' to={item[1]} key={key}>
						<img src={item[0]} width='60px' />
					</Link>
				);
			})}
		</div>
	);
};

const getUserProfile = async (username) => {
	const config = {
		method: 'get',
		url: `/users/profile?username=${username}`,
	};
	try {
		const res = await apiClient(config);
		if (res.data.status == 'success') return res.data.message;
		else return null;
	} catch (error) {
		console.log(error);
		// alert(error);
		return null;
	}
};

function getYears(birthday) {
	const n = Date.now();
	const d = new Date(birthday);
	const delta = n - d;
	return Math.floor(delta / 1000 / 60 / 60 / 24 / 365);
}

export default Profile;
