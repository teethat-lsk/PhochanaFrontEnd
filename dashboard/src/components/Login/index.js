import './login.css';

const Login = () => {
	return (
		<div className='login_container noselect'>
			<div className='login_body_container'>
				<div className='login_logo_container'>
					<div style={{ fontSize: '50px' }}>PhoChana</div>
					<div>its finger lickin good</div>
				</div>
				<div className='line'></div>
				<div className='login_input_container'>
					<i class='fa fa-users icon' aria-hidden='true'></i>
					<div className='input_container'>
						<div>username</div>
						<input className='custom_input'></input>
					</div>
					<div className='input_container'>
						<div>password</div>
						<input className='custom_input' type='password'></input>
					</div>
					<div className='btn_login'>Login</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
