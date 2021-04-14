import React from 'react';
import '../styles/Register.css';
import Input from '../components/Input';
import apiClient from '../middleware/ApiClient';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
  }
  handleRegist = async (e) => {
    e.preventDefault();
    const config = {
      method: 'post',
      url: `/users/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        displayName: this.state.displayName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
      }),
    };
    const res = await apiClient(config);
    console.log(res.data);
    //alert(res.data);
    if (res.data.status === 'success') {
      setToken(res.data.message.token);
      // this.props.history.push('/main');
      this.props.history.push('/main');
    }
  };
  handleDisplayNameChange = (event) => {
    this.setState({
      displayName: event.target.value,
    });
  };
  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
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
  handleConfirmPasswordChange = (event) => {
    this.setState({
      confirmPassword: event.target.value,
    });
  };

  render(){
      return (
        <form className='window' onSubmit={this.handleRegist}>
          <label className='registLabel'>ลงทะเบียน</label>
          <div className='container'>
            <form onSubmit={this.handleRegist}>
              <div className='displayName'>
                <label className='displayNameText'>ชื่อใช้แสดง</label>
                <Input
                  className='displayNameBox'
                  type='text'
                  value={this.state.displayName}
                  onChange={this.state.handleDisplayNameChange}
                  minLength={8}
                  maxLength={15}
                  allow='displayName'
                ></Input>
              </div>
              <div className='email'>
                <label className='emailText'>อีเมล</label>
                <Input
                  className='emailBox'
                  type='text'
                  value={this.state.displayName}
                  onChange={this.state.handleEmailChange}
                  minLength={1}
                  maxLength={20}
                  allow='email'
                ></Input>
              </div>
              <div className='username'>
                <label className='usernameText'>ชื่อผู้ใช้</label>
                <Input
                  className='usernameBox'
                  type='text'
                  value={this.state.username}
                  onChange={this.state.handleUsernameChange}
                  allow='username'
                ></Input>
              </div>
              <div className='password'>
                <label className='password'>รหัสผ่าน</label>
                <Input
                  className='password'
                  type='text'
                  value={this.state.password}
                  onChange={this.state.handlePasswordChange}
                  minLength={8}
                  maxLength={30}
                  allow='password'
                ></Input>
              </div>
            </form>
          </div>
        </form>
      );
  }
}

export default Register;
