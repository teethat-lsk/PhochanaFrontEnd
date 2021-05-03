import './login.css';
import react, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import apiClient from '../../middleware/ApiClient';
import { setToken } from '../../middleware/Cookie';

const Login = (props) => {
	// console.log(props);
	const history = useHistory();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		// console.log(username, password);
		const config = {
			method: 'post',
			url: `/supervisor/login`,
			headers: {
				'Content-Type': 'application/json',
			},
			data: JSON.stringify({
				username,
				password,
			}),
		};
		// console.log(username, password);
		const res = await apiClient(config);
		// alert(res.data);
		// console.log(res.data.message);
		try {
			if (res.data.status === 'success') {
				const token = res.data.message.token;
				const role = res.data.message.user_data.role;
				const _username = res.data.message.user_data.username;
				setToken(token, role, _username);
				if (role === 'Admin') props.history.push('/admin');
				else props.history.push('/store');
			} else {
				// console.log(res.data);
				alert(res.data.message);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const onKeyUp = (e) => {
		if (e.key === 'Enter') {
			// console.log('enter press');
			handleSubmit();
		}
	};

	return (
		<div className='login_container noselect'>
			<div className='login_body_container'>
				<div className='login_logo_container'>
					<div style={{ fontSize: '50px' }}>PhoChana</div>
					<div>its finger lickin good</div>
				</div>
				<div className='line'></div>
				<div className='login_input_container'>
					<i className='fa fa-users icon' aria-hidden='true'></i>
					<div className='input_container'>
						<div>username</div>
						<input
							autoComplete='off'
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
							className='custom_input'
						></input>
					</div>
					<div className='input_container'>
						<div>password</div>
						<input
							autoComplete='off'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							className='custom_input'
							type='password'
							onKeyPress={onKeyUp}
						></input>
					</div>
					<div className='btn_login' onClick={handleSubmit}>
						Login
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Login);
