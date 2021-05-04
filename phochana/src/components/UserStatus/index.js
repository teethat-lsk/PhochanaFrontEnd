import react, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './UserStatus.css';
import apiClient from '../../middleware/ApiClient';
import '../../styles/Exercises/sweetalert2.scss';

const UserStatus = () => {
	const [userCard, setCard] = useState();

	useEffect(async () => {
		try {
			const res = await getUserCard();
			if (res) {
				// console.log(res);
				setCard(res);
			}
		} catch (err) {}
	}, []);

	return (
		<div className='user_status_container'>
			<div className='user_status_top'>
				<div className='user_status_lr'>
					<div className='user_status_val'>
						{userCard && userCard.weight} กก.
					</div>
					<div
						className='user_status_btn'
						onClick={() => {
							HandleSubmit();
						}}
					>
						บันทึกน้ำหนัก
					</div>
				</div>
				<div className='user_status_line'></div>
				<div className='user_status_lr'>
					<div>วันนี้</div>
					<div className='user_status_lb'>แคลอรี่ที่ได้รับจากอาหาร</div>
					<div>{userCard && userCard.food_cal} KCal</div>
					<div className='user_status_lb'>เผาผลาญจากการออกกำลังกาย</div>
					<div>{userCard && userCard.exercise_cal} Cal</div>
				</div>
			</div>
			<div className='user_status_bottom'>
				<div className='user_status_d'>
					BMI: {userCard && userCard.bmi} <br />
					{BmiProcess(userCard && (userCard.bmi || 0))}
				</div>
				<div className='user_status_d'>BMR: {userCard && userCard.bmr}</div>
			</div>
		</div>
	);
};

const HandleSubmit = async () => {
	const result = await Swal.fire({
		title: 'ระบุน้ำหนัก (kg)',
		input: 'number',
		inputAttributes: {
			autocapitalize: 'off',
		},
		showCancelButton: true,
		confirmButtonText: 'Save',
		showLoaderOnConfirm: true,
		preConfirm: async (value) => {
			if (value >= 30 && value <= 200) {
				var config = {
					method: 'put',
					url: '/users/weight',
					data: {
						weight: value,
					},
				};
				try {
					const res = await apiClient(config);
					// console.log(res.data);
					if (res.data.status === 'success') {
						return 'บันทึกข้อมูลสำเร็จ';
					} else {
						Swal.showValidationMessage('บันทึกข้อมูลไม่สำเร็จ');
						return;
					}
				} catch (err) {}
			} else {
				Swal.showValidationMessage('น้ำหนักต้องอยู่ในช่วง 30-200 kg');
			}
			// console.log('loading');
		},
		allowOutsideClick: () => !Swal.isLoading(),
	});
	console.log(result);
	if (result.value) {
		await Swal.fire({
			title: `${result.value}`,
		});
		window.location.reload();
	}
};

const getUserCard = async () => {
	const config = {
		method: 'get',
		url: `/users/card`,
	};
	try {
		const res = await apiClient(config);
		if (res.data.status == 'success') return res.data.message;
		return null;
	} catch (error) {
		// console.log(error);
		// alert(error);
		return null;
	}
};

const BmiProcess = (bmi) => {
	if (bmi < 18.5) return 'น้ำหนักน้อย/ผอม';
	else if (bmi < 22.9) return 'ปกติ (สุขภาพดี)';
	else if (bmi < 24.9) return 'ท้วม';
	else if (bmi < 29.9) return 'อ้วน';
	else return 'อ้วนมาก';
};

export default UserStatus;
