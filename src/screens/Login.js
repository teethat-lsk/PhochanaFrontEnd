import React, { Component } from 'react';
import '../styles/Login.css';
// import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			isLoading: false,
		};
	}
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

	/*handleSubmit = async (event) => {
    event.preventDefault();
    if (!this.state.isLoading) {
      this.setState({
        isLoading: true,
      });
      var data = JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      });
      var config = {
        method: "post",
        url: `${URL}/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      try {
        const res = await axios(config);
        console.log(res.data.status);
        this.setState({
          isLoading: false,
        });
      } catch (error) {
        console.log(error);
      }
      // axios(config)
      //   .then(function (response) {
      //     console.log(JSON.stringify(response.data));
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      console.log(this.state.username);
      console.log(this.state.password);
    } else {
      console.log("Cannot submit");
    }
  };*/
	render() {
		return (
			<div className='window'>
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
								type='text'
								value={this.state.password}
								onChange={this.handlePasswordChange}
								className='passBox'
							/>
						</div>
					</form>
				</div>
				<button type='submit' className='login_btn_enter'>
					เข้าสู่ระบบ
				</button>
				<a href='/register' className='create_new_account'>
					สร้างบันชีผู้ใช้ใหม่
				</a>
			</div>
		);
	}
}

export default Login;
