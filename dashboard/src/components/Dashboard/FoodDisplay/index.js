import react, { useState } from 'react';
import apiClient from '../../../middleware/ApiClient';
import './fooddisplay.css';

const FoodDisplay = () => {
	const [addNewMenu, toggle] = useState(true);
	const [selectItem, setSelectItem] = useState(null);
	const [filter, setFilter] = useState('');
	const [menuItem, setMenuItem] = useState([
		{
			name: 'ข้าวมันไก่',
			cal_p_h: 100,
			picture: '../../images/ข้าวมันไก่.jpg',
		},
		{
			name: 'ข้าวมันไก่ 2',
			cal_p_h: 200,
			picture: '../../images/ข้าวมันไก่.jpg',
		},
		{
			name: 'ข้าวมันไก่ 3',
			cal_p_h: 300,
			picture: '../../images/ข้าวมันไก่.jpg',
		},
		{
			name: 'ข้าวมันไก่ 4',
			cal_p_h: 400,
			picture: '../../images/ข้าวมันไก่.jpg',
		},
		{
			name: 'ข้าวมันไก่ 5',
			cal_p_h: 500,
			picture: './../images/ข้าวมันไก่.jpg',
		},
		{
			name: 'ข้าวมันไก่ 6',
			cal_p_h: 10000,
			picture: './../images/ข้าวมันไก่.jpg',
		},
	]);

	const callbackOnNameChange = (event) => {
		// console.log(selectItem);
		setSelectItem({ ...selectItem, name: event.target.value });
	};

	const callbackOnCalChange = (event) => {
		setSelectItem({ ...selectItem, cal_p_h: event.target.value });
	};

	const callbackOnPictureChange = (event) => {
		setSelectItem({ ...selectItem, picture: event.target.value });
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
							return (
								<div
									onClick={() => {
										setSelectItem(menuItem[key]);
										toggle(false);
										console.log(menuItem[key]);
									}}
									className='menu_button noselect'
									style={{ backgroundImage: `url(${item.picture})` }}
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
					<ShowMenu
						_name={selectItem.name}
						_cal={selectItem.cal_p_h}
						_picture={selectItem.picture}
						callbackOnNameChange={callbackOnNameChange}
						callbackOnCalChange={callbackOnCalChange}
						callbackOnPictureChange={callbackOnPictureChange}
					/>
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
					<div className='btn_action save noselect'>บันทึก</div>
					<div onClick={cancelHandle} className='btn_action cancle noselect'>
						ยกเลิก
					</div>
				</div>
			</div>
		</div>
	);
};

const ShowMenu = ({
	_name,
	_cal,
	_picture,
	callbackOnNameChange,
	callbackOnCalChange,
	callbackOnPictureChange,
}) => {
	const [tempFile, setTempFile] = useState(null);
	const [tempImage, setTempImage] = useState(null);

	const handleFileUpload = async (event) => {
		// console.log(event.target.files[0]);
		setTempImage(URL.createObjectURL(event.target.files[0]));

		setTempFile(event.target.files[0]);
	};

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
		downloadLink.download = `${_name}.png`;
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	const qrcodeHandle = () => {
		downloadQR();
	};

	const updateHandle = () => {
		//TODO Call API Here :)
		// console.log(_name, _cal);
	};

	return (
		<div className='add_new_menu_container'>
			<div className='add_new_menu_header'>
				<div className='input_menu_container'>
					<div className='menu_title'>ชื่ออาหาร</div>
					<input
						value={_name}
						onChange={(e) => callbackOnNameChange(e)}
						className='menu_input'
						placeholder='กรุณาใส่ชื่ออาหาร'
					></input>
				</div>
				<div className='input_menu_container' style={{ marginLeft: '100px' }}>
					<div className='menu_title'>ปริมาณแคลรอรี่ (กิโลแคล)</div>
					<input
						type='number'
						value={_cal}
						onChange={(e) => callbackOnCalChange(e)}
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
					<div className='btn_action save noselect' onClick={updateHandle}>
						อัพเดท
					</div>
					<div onClick={cancelHandle} className='btn_action cancle noselect'>
						ยกเลิก
					</div>
					<div onClick={qrcodeHandle} className='btn_action qrcode noselect'>
						<i className='fa fa-qrcode' aria-hidden='true'></i>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FoodDisplay;
