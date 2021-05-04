import React, { useState } from 'react';
import { removeToken } from '../middleware/Cookie';
import { useHistory } from 'react-router-dom';
import apiClient from '../middleware/ApiClient';
import { setToken } from '../middleware/Cookie';
import Input from '../components/Input';
import Swal from 'sweetalert2';
import '../styles/Exercises/sweetalert2.scss';
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
	const [tError, setTError] = useState('');

	const handleOnChange = (e) => {
		setErrors({ ...errors, [e.target.id]: e.target.error });
		setUserData({ ...userData, [e.target.id]: e.target.value });
	};

	const canSubmit = () => {
		// Error check
		for (const x in errors) {
			if (errors[x]) {
				// haveError = true;
				return false;
			}
		}
		return true;
	};

	const emptyCheck = () => {
		return (
			userData.display_name != '' &&
			userData.email != '' &&
			userData.username != '' &&
			userData.password != '' &&
			userData.c_password != ''
		);
	};

	const checkPassword = () => {
		return userData.password === userData.c_password;
	};

	const handleSubmit = async () => {
		console.log(userData.username);
		// console.log(userData.display_name);
		if (canSubmit() && emptyCheck()) {
			// console.log('Can submit');
			if (!checkPassword()) {
				// console.log('password not match');
				setTError('รหัสผ่านและยืนยันรหัสผ่านต้องเหมือนกัน');
			}
			// Will call hash password!
			else {
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

				try {
					const res = await apiClient(config);
					console.log(res.data);
					// alert(res.data);
					if (res.data.status === 'success') {
						setToken(res.data.message.token);
						// this.props.history.push('/main');
						history.push('/');
					} else if (
						res.data.status == 'fail' &&
						res.data.message == 'username exists already!'
					) {
						Swal.fire({
							title: 'ชื่อผู้ใช้งานนี้มีในระบบแล้ว',
							text: '',
							type: 'warning',
						});
						// console.log('test');
					}
				} catch (err) {
					// console.log(err.message);
				}
			}
		} else {
			// console.log('ช่องนี้เว้นว่างไม่ได้');
			// console.log(errors);
			setTError('กรุณากรอกข้อมูลให้ครบ');
		}
	};

	return (
		<div className='register_container fade_effect'>
			<label className='register_label'>ลงทะเบียน</label>
			<div className='input_container'>
				<div className='sub_input_container'>
					<label className='input_label'>ชื่อใช้แสดง</label>
					<Input
						id='display_name'
						type='text'
						value={userData.display_name}
						onChange={handleOnChange}
						minLength={9}
						maxLength={15}
						allow='displayName'
						autoComplete='off'
						tError={tError}
						setTError={setTError}
						emptyCheck
					></Input>
				</div>
				<div className='sub_input_container'>
					<label className='input_label'>อีเมล</label>
					<Input
						id='email'
						type='text'
						value={userData.email}
						onChange={handleOnChange}
						minLength={4}
						maxLength={20}
						allow='email'
						autoComplete='off'
						tError={tError}
						setTError={setTError}
						emptyCheck
					></Input>
				</div>
				<div className='sub_input_container'>
					<label className='input_label'>ชื่อผู้ใช้</label>
					<Input
						minLength={7}
						maxLength={20}
						id='username'
						type='text'
						value={userData.username}
						onChange={handleOnChange}
						allow='username'
						autoComplete='off'
						tError={tError}
						setTError={setTError}
						emptyCheck
					></Input>
				</div>
				<div className='sub_input_container'>
					<label className='input_label'>รหัสผ่าน</label>
					<Input
						id='password'
						type='text'
						value={userData.password}
						onChange={handleOnChange}
						minLength={9}
						maxLength={30}
						allow='password'
						type='password'
						autoComplete='off'
						tError={tError}
						setTError={setTError}
						emptyCheck
					></Input>
				</div>
				<div className='sub_input_container'>
					<label className='input_label'>ยืนยันรหัสผ่าน</label>
					<Input
						id='c_password'
						type='text'
						value={userData.c_password}
						onChange={handleOnChange}
						minLength={9}
						maxLength={30}
						allow='password'
						type='password'
						autoComplete='off'
						tError={tError}
						setTError={setTError}
						emptyCheck
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
					href='/login'
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
