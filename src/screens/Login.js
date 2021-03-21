import React, { Component } from 'react';
import '../styles/Login.css';
import apiClient from '../middleware/ApiClient';
import { setToken } from '../middleware/Cookie';
import { withRouter } from 'react-router-dom';
class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			isLoading: false,
		};
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const config = {
			method: 'post',
			url: `/users/login`,
			headers: {
				'Content-Type': 'application/json',
			},
			data: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
			}),
		};
		const res = await apiClient(config);
		console.log(res.data);
		if (res.data.status === 'success') {
			setToken(res.data.message.token);
			// this.props.history.push('/main');
			this.props.history.push('/main');
		}
	};

	handleUsernameChange = (event) => {
		this.setState({
			username: event.target.value,
		});
	};

	handlePasswordChange = (event) => {
		this.setState({
			password: event.target.value,
		});
	};

	render() {
		return (
			<form className='window' onSubmit={this.handleSubmit}>
				<label className='textLogin'> เข้าสู่ระบบ </label>
				<div className='login_container'>
					<form onSubmit={this.handleSubmit}>
						<div className='username'>
							<label className='textUser'>ชื่อผู้ใช้ </label>
							<input
								type='text'
								value={this.state.username}
								onChange={this.handleUsernameChange}
								className='userBox'
							/>
						</div>
						<div className='password'>
							<label className='textPass'>รหัสผ่าน</label>
							<input
								type='password'
								value={this.state.password}
								onChange={this.handlePasswordChange}
								className='passBox'
							/>
						</div>
					</form>
				</div>
				<button
					type='submit'
					className='login_btn_enter'
					// onClick={this.handleSubmit}
				>
					เข้าสู่ระบบ
				</button>
				<a href='/register' className='create_new_account'>
					สร้างบันชีผู้ใช้ใหม่
				</a>
			</form>
		);
	}
}

export default withRouter(Login);
