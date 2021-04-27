import React, { useState } from 'react';
import { removeToken } from '../middleware/Cookie';
import { useHistory } from 'react-router-dom';
import apiClient from '../middleware/ApiClient';
import { setToken } from '../middleware/Cookie';
import Input from '../components/Input';
import '../styles/Register.css';

function Register() {
	const history = useHistory();
	const [userData, setUserData] = useState({
		display_name: '',
		email: '',
		username: '',
		password: '',
		c_password: '',
	});
	const [errors, setErrors] = useState({});

	const handleOnChange = (e) => {
		setErrors({ ...errors, [e.target.id]: e.target.error });
		setUserData({ ...userData, [e.target.id]: e.target.value });
	};

	const canSubmit = () => {
		// Error check
		let haveError = false;
		for (const x in errors) {
			if (errors[x]) {
				haveError = true;
				return false;
			}
		}
		return true;
	};

	const emptyCheck = () => {
		return (
			userData.display_name !== '' &&
			userData.email !== '' &&
			userData.username !== '' &&
			userData.password !== '' &&
			userData.c_password !== ''
		);
	};

	const checkPassword = () => {
		return userData.password === userData.c_password;
	};

	const handleSubmit = async () => {
		if (canSubmit() && emptyCheck() && checkPassword()) {
			console.log('Can submit');

			// Will call hash password!
			const config = {
				method: 'post',
				url: `/users/register`,
				headers: {
					'Content-Type': 'application/json',
				},
				data: JSON.stringify({
					username: userData.username,
					password: userData.password,
					display_name: userData.display_name,
					password: userData.password,
					email: userData.email,
				}),
			};

			const res = await apiClient(config);
			console.log(res.data);
			//alert(res.data);
			if (res.data.status === 'success') {
				setToken(res.data.message.token);
				// this.props.history.push('/main');
				history.push('/');
			}
		} else {
			console.log("can't submit");
		}
	};

	return (
		<div className='register_container'>
			<label className='register_label'>ลงทะเบียน</label>
			<div className='input_container'>
				<div className='sub_input_container'>
					<label className='input_label'>ชื่อใช้แสดง</label>
					<Input
						id='display_name'
						type='text'
						value={userData.displayName}
						onChange={handleOnChange}
						minLength={8}
						maxLength={15}
						allow='displayName'
					></Input>
				</div>
				<div className='sub_input_container'>
					<label className='input_label'>อีเมล</label>
					<Input
						id='email'
						type='text'
						value={userData.displayName}
						onChange={handleOnChange}
						minLength={1}
						maxLength={20}
						allow='email'
					></Input>
				</div>
				<div className='sub_input_container'>
					<label className='input_label'>ชื่อผู้ใช้</label>
					<Input
						id='username'
						type='text'
						value={userData.username}
						onChange={handleOnChange}
						allow='username'
					></Input>
				</div>
				<div className='sub_input_container'>
					<label className='input_label'>รหัสผ่าน</label>
					<Input
						id='password'
						type='text'
						value={userData.password}
						onChange={handleOnChange}
						minLength={8}
						maxLength={30}
						allow='password'
						type='password'
					></Input>
				</div>
				<div className='sub_input_container'>
					<label className='input_label'>ยืนยันรหัสผ่าน</label>
					<Input
						id='c_password'
						type='text'
						value={userData.confirmPassword}
						onChange={handleOnChange}
						minLength={8}
						maxLength={30}
						allow='password'
						type='password'
					></Input>
				</div>
				<button
					type='submit'
					className='login_btn_enter'
					onClick={handleSubmit}
				>
					สมัครสมาชิก
				</button>
				<a
					href='/register'
					className='create_new_account'
					style={{ marginBottom: '10px' }}
				>
					มีบัญชีอยู่แล้ว | เข้าสู่ระบบ
				</a>
			</div>
		</div>
	);
}

export default Register;
