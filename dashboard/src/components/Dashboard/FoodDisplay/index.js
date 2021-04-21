import react, { useState } from 'react';
import './fooddisplay.css';

const FoodDisplay = () => {
	const [addNewMenu, toggle] = useState(true);
	const [menuItem, setMenuItem] = useState([
		['ข้าวมันไก่', './images/ข้าวมันไก่.jpg'],
		['test2'],
		['test3'],
		['test5'],
		['test6'],
		['test7'],
		['test8'],
	]);

	return (
		<div className='food_display_container'>
			<div className='menu_container'>
				<div className='menu_body'>
					{menuItem.map((item, key) => {
						return (
							<div
								className='menu_button noselect'
								style={{ backgroundImage: `url(${item[1]})` }}
								key={key}
							>
								{/* <img className='img_menu' src={item[1]} /> */}
								<p className='menu_name'>{item[0]}</p>
							</div>
						);
					})}
				</div>
				<div
					className='add_menu noselect'
					onClick={() => {
						toggle(!addNewMenu);
						// console.log(addNewMenu);
					}}
				>
					เพิ่มเมนูอาหาร
				</div>
			</div>
			<div className='menu_display'>
				{addNewMenu ? <AddNewMenu /> : <ShowMenu />}
			</div>
		</div>
	);
};

const AddNewMenu = () => {
	const [tempFile, setTempFile] = useState(null);
	const [tempImage, setTempImage] = useState(null);

	const handleFileUpload = async (event) => {
		// console.log(event.target.files[0]);
		setTempImage(URL.createObjectURL(event.target.files[0]));

		setTempFile(event.target.files[0]);
	};

	return (
		<div className='add_new_menu_container'>
			<div className='add_new_menu_header'>
				<div className='input_menu_container'>
					<div className='menu_title'>ชื่ออาหาร</div>
					<input className='menu_input'></input>
				</div>
				<div className='input_menu_container'>
					<div className='menu_title'>ปริมาณแคลรอรี่ (กิโลแคล)</div>
					<input className='menu_input' type='number'></input>
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
					<div className='btn_action cancle noselect'>ยกเลิก</div>
				</div>
			</div>
		</div>
	);
};

const ShowMenu = () => {
	return <div>Show Menu</div>;
};

export default FoodDisplay;
