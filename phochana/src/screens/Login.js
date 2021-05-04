import React, { Component } from "react";
import "../styles/Login.css";
import apiClient from "../middleware/ApiClient";
import { setToken } from "../middleware/Cookie";
import { withRouter } from "react-router-dom";
import Input from "../components/Input";
import Swal from "sweetalert2";
import "../styles/Exercises/sweetalert2.scss";
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLoading: false,
      tError: "",
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      method: "post",
      url: `/users/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    };
    const res = await apiClient(config);
    // console.log(res.data);
    //alert(res.data);
    if (res.data.status === "success") {
      setToken(res.data.message.token);
      // this.props.history.push('/main');
      this.props.history.push("/");
    } else {
      Swal.fire({
        title: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
        text: "",
        type: "warning",
      });
    }
  };

  preCheck = (e) => {
    if (this.state.username == "" || this.state.password == "") {
      this.setState({
        tError: "กรุณากรอกข้อมูลให้ครบ",
      });
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
      <form className='window fade_effect' onSubmit={this.handleSubmit}>
        <label className='textLogin'> เข้าสู่ระบบ </label>
        <div className='login_container'>
          <form onSubmit={this.handleSubmit}>
            <div className='username'>
              <label className='textUser'>ชื่อผู้ใช้ </label>
              {/* <input
                type='text'
                value={this.state.username}
                onChange={this.handleUsernameChange}
                className='userBox' */}
              <Input
                value={this.state.username}
                onChange={this.handleUsernameChange}
                allow='username'
                minLength={7}
                maxLength={20}
                autoComplete='off'
                tError={this.state.tError}
                emptyCheck
              ></Input>
            </div>
            <div className='password'>
              <label className='textPass'>รหัสผ่าน</label>
              {/* <input
                type='password'
                value={this.state.password}
                onChange={this.handlePasswordChange}
                className='passBox'
              /> */}
              <Input
                value={this.state.password}
                onChange={this.handlePasswordChange}
                allow='password'
                minLength={8}
                maxLength={30}
                type='password'
                autoComplete='off'
                tError={this.state.tError}
                emptyCheck
              ></Input>
            </div>
          </form>
        </div>
        <button
          type='submit'
          className='login_btn_enter'
          onClick={this.preCheck}
        >
          เข้าสู่ระบบ
        </button>
        <a href='/register' className='create_new_account'>
          สร้างบัญชีผู้ใช้ใหม่
        </a>
      </form>
    );
  }
}

export default withRouter(Login);
