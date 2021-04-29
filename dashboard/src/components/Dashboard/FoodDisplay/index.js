import react, { useState, useEffect } from 'react';
import apiClient from '../../../middleware/ApiClient';
import getImage from '../../../middleware/GetImage';
import { frontend } from '../../../config';
import { QRCode } from 'react-qrcode-logo';
import HomeLogoImage from '../../../images/logo_home.png';
import './fooddisplay.css';

const FoodDisplay = () => {
	const [addNewMenu, toggle] = useState(true);
	const [selectItem, setSelectItem] = useState(null);
	const [filter, setFilter] = useState('');
	const [menuItem, setMenuItem] = useState([]);

	useEffect(async () => {
		let res = await getInfo();
		// console.log(res.length);
		for (var index = 0; index < res.length; index++) {
			res[index].image = await getImage(res[index].image);
		}
		// console.log(res);
		setMenuItem(res);
	}, []);

	const callbackOnChange = (e) => {
		// console.log(selectItem);
		setSelectItem({ ...selectItem, [e.target.id]: e.target.value });
	};

	return (
		<div className='food_display_container'>
			<div className='menu_container'>
				<div className='store_find'>
					<div className='store_find_label noselect'>ค้นหาอาหาร</div>
					<input
						className='store_find_input'
						onChange={(e) => {
							setFilter(e.target.value);
						}}
					></input>
				</div>
				<div className='menu_body'>
					{menuItem
						.filter((element) => {
							if (filter === null) {
								return element;
							}
							if (
								element.name.toLowerCase().includes(filter.toLowerCase()) ||
								element.name.toUpperCase().includes(filter.toUpperCase())
							) {
								return element;
							}
						})
						.map((item, key) => {
							// console.log(key);
							// console.log(item.image);
							return (
								<div
									onClick={() => {
										setSelectItem(menuItem[key]);
										toggle(false);
										// console.log(menuItem[key]);
									}}
									className='menu_button noselect'
									style={{ backgroundImage: `url(${item.image})` }}
									key={key}
								>
									{/* <img className='img_menu' src={item[1]} /> */}
									<p className='menu_name'>{item.name}</p>
								</div>
							);
						})}
				</div>
				<div
					className='add_menu noselect'
					onClick={() => {
						toggle(true);
						// console.log(addNewMenu);
					}}
				>
					เพิ่มเมนูอาหาร
				</div>
			</div>
			<div className='menu_display'>
				{addNewMenu ? (
					<AddNewMenu />
				) : (
					<ShowMenu food={selectItem} callbackOnChange={callbackOnChange} />
				)}
			</div>
		</div>
	);
};

const AddNewMenu = () => {
	const [tempFile, setTempFile] = useState(null);
	const [tempImage, setTempImage] = useState(null);
	const [name, setName] = useState('');
	const [cal, setCal] = useState(0);

	const handleFileUpload = async (event) => {
		// console.log(event.target.files[0]);
		setTempImage(URL.createObjectURL(event.target.files[0]));

		setTempFile(event.target.files[0]);
	};

	const cancelHandle = () => {
		setName('');
		setCal(0);
		setTempFile(null);
		setTempImage(null);
	};

	const handleSubmit = async () => {
		let bodyFormData = new FormData();
		bodyFormData.append('image', tempFile); //append the values with key, value pair
		bodyFormData.append('calorie', cal);
		bodyFormData.append('name', name);
		var config = {
			method: 'post',
			url: '/food',
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			data: bodyFormData,
		};
		// console.log(newUserData.job);
		const res = await apiClient(config);
		if (res.data.status === 'success') {
			window.location.reload();
			console.log(res.data);
		} else {
			// setLodding(false);
			console.log('fetch backend fail');
		}
	};

	return (
		<div className='add_new_menu_container'>
			<div className='add_new_menu_header'>
				<div className='input_menu_container'>
					<div className='menu_title'>ชื่ออาหาร</div>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						className='menu_input'
						placeholder='กรุณาใส่ชื่ออาหาร'
					></input>
				</div>
				<div className='input_menu_container' style={{ marginLeft: '100px' }}>
					<div className='menu_title'>ปริมาณแคลรอรี่ (กิโลแคล)</div>
					<input
						type='number'
						value={cal}
						onChange={(e) => setCal(e.target.value)}
						className='menu_input'
						min='0.1'
						max='10000'
					></input>
				</div>
			</div>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<div>
					<div
						className='image_preview'
						style={{ backgroundImage: `url(${tempImage})` }}
					>
						<div style={{ fontSize: '14px', marginLeft: '5px' }}>
							Image Preview
						</div>
					</div>
					<input
						onChange={handleFileUpload}
						style={{ marginLeft: '20px' }}
						type='file'
						accept='.jpg, .jpeg, .png'
					/>
				</div>
				<div className='btn_container'>
					<div onClick={handleSubmit} className='btn_action save noselect'>
						บันทึก
					</div>
					<div onClick={cancelHandle} className='btn_action cancle noselect'>
						ยกเลิก
					</div>
				</div>
			</div>
		</div>
	);
};

const ShowMenu = ({ food, callbackOnChange }) => {
	// console.log(food);
	const [tempFile, setTempFile] = useState(null);
	const [tempImage, setTempImage] = useState(null);

	const handleFileUpload = async (event) => {
		// console.log(event.target.files[0]);
		setTempImage(URL.createObjectURL(event.target.files[0]));

		setTempFile(event.target.files[0]);
	};

	useEffect(() => {
		setTempImage(food.image);
	}, [food.image]);

	const cancelHandle = () => {
		window.location.reload();
	};

	const downloadQR = () => {
		const canvas = document.getElementById('react-qrcode-logo');
		// console.log(canvas);
		const pngUrl = canvas
			.toDataURL('image/png')
			.replace('image/png', 'image/octet-stream');
		let downloadLink = document.createElement('a');
		downloadLink.href = pngUrl;
		downloadLink.download = `${food.name}.png`;
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	const qrcodeHandle = () => {
		downloadQR();
	};

	const updateHandle = () => {
		//TODO Call API Here :)
		console.log();
		// console.log(_name, _cal);
	};

	return (
		<div className='add_new_menu_container'>
			<div className='add_new_menu_header'>
				<div className='input_menu_container'>
					<div className='menu_title'>ชื่ออาหาร</div>
					<input
						value={food && food.name}
						onChange={(e) => callbackOnChange(e)}
						className='menu_input'
						placeholder='กรุณาใส่ชื่ออาหาร'
						autoComplete='off'
					></input>
				</div>
				<div className='input_menu_container' style={{ marginLeft: '100px' }}>
					<div className='menu_title'>ปริมาณแคลรอรี่ (กิโลแคล)</div>
					<input
						type='number'
						value={food && food.calorie}
						onChange={(e) => callbackOnChange(e)}
						className='menu_input'
						min='0.1'
						max='10000'
						autoComplete='off'
					></input>
				</div>
			</div>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<div>
					<div
						className='image_preview'
						style={{ backgroundImage: `url(${tempImage})` }}
					>
						<div style={{ fontSize: '14px', marginLeft: '5px' }}>
							Image Preview
						</div>
					</div>
					<input
						onChange={handleFileUpload}
						style={{ marginLeft: '20px' }}
						type='file'
						accept='.jpg, .jpeg, .png'
					/>
				</div>
				<div className='btn_container'>
					<div>
						<QRCode
							value={`${frontend}/food/${food._id}`}
							logoImage={HomeLogoImage}
							size='200'
						/>
					</div>

					<div
						onClick={qrcodeHandle}
						className='btn_action qrcode noselect'
						style={{ marginBottom: '30px' }}
					>
						<i className='fa fa-qrcode' aria-hidden='true'></i>
					</div>

					<div className='btn_action save noselect' onClick={updateHandle}>
						อัพเดท
					</div>
					<div onClick={cancelHandle} className='btn_action cancle noselect'>
						ยกเลิก
					</div>
				</div>
			</div>
		</div>
	);
};

const getInfo = async () => {
	const config = {
		method: 'get',
		url: `/foodstore`,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await apiClient(config);
		if (res.data.status === 'success') {
			return res.data.message.food;
		} else {
			return [];
		}
	} catch (error) {
		return [];
	}
};

export default FoodDisplay;
