import React, { useState, useEffect } from 'react';
import apiClient from '../../../middleware/ApiClient';
import './store.css';

const Store = () => {
	const [selectItem, setSelectItem] = useState(null);
	const [filter, setFilter] = useState('');
	const [addStore, toggle] = useState(false);
	const [storeList, setStoreList] = useState([]);

	useEffect(async () => {
		const res = await getInfo();
		setStoreList(res);
		// console.log(res);
	}, []);

	const callbackOnChange = (e) => {
		setSelectItem({ ...selectItem, [e.target.id]: e.target.value });
	};

	return (
		<div className='store_display_container'>
			<div className='store_container'>
				<div className='store_find'>
					<div className='store_find_label noselect'>ค้นหาร้านค้า</div>
					<input
						className='store_find_input'
						onChange={(e) => {
							setFilter(e.target.value);
						}}
					></input>
				</div>
				<div className='store_body'>
					{storeList
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
										setSelectItem(storeList[key]);
										toggle(false);
										// console.log(menuItem[key]);
									}}
									className='store_button noselect'
									style={{ backgroundImage: `url('./../images/store.jpg')` }}
									key={key}
								>
									{/* <img className='img_menu' src={item[1]} /> */}
									<p className='store_name'>{item.name}</p>
								</div>
							);
						})}
				</div>
				<div
					className='add_store noselect'
					onClick={() => {
						toggle(true);
						// console.log(addNewMenu);
					}}
				>
					เพิ่มร้านค้า
				</div>
			</div>
			{addStore ? (
				<AddStore />
			) : (
				<EditStore store={selectItem} callbackOnChange={callbackOnChange} />
			)}
		</div>
	);
};

const AddStore = () => {
	const [store, setStoreData] = useState({
		name: '',
		display_name: '',
		username: '',
		password: '',
		c_password: '',
	});

	const handleOnChange = (e) => {
		setStoreData({ ...store, [e.target.id]: e.target.value });
	};

	const handleOnCancle = (e) => {
		setStoreData({
			name: '',
			display_name: '',
			username: '',
			password: '',
			c_password: '',
		});
	};

	const handleSubmit = async () => {
		const config = {
			method: 'post',
			url: `/store`,
			headers: {
				'Content-Type': 'application/json',
			},
			data: JSON.stringify({
				name: store.name,
				display_name: store.display_name,
				username: store.username,
				password: store.password,
			}),
		};
		// console.log(username, password);
		const res = await apiClient(config);
		//alert(res.data);
		if (res.data.status === 'success') {
			window.location.reload();
			console.log(res.data);
		}
	};

	return (
		<div className='edit_store_container'>
			<div className='edit_store_title_label noselect'>เพิ่มร้านค้าใหม่</div>

			<div className='edit_store_input'>
				<div className='edit_store_label'>ชื่อร้านค้า</div>
				<input
					className='edit_store_input'
					value={store.name}
					id='name'
					onChange={handleOnChange}
					autoComplete='off'
				></input>
			</div>
			<div className='user_store_container'>
				<div className='edit_store_title'>ข้อมูลผู้ใช้งาน</div>
				<div className='edit_store_input'>
					<div className='edit_store_label'>Display name</div>
					<input
						className='edit_store_input'
						value={store.display_name}
						id='display_name'
						onChange={handleOnChange}
						autoComplete='off'
					></input>
				</div>
				<div className='edit_store_input'>
					<div className='edit_store_label'>Username</div>
					<input
						className='edit_store_input'
						value={store.username}
						id='username'
						onChange={handleOnChange}
						autoComplete='off'
					></input>
				</div>
				<div className='edit_store_input'>
					<div className='edit_store_label'>Password</div>
					<input
						className='edit_store_input'
						id='password'
						value={store.password}
						type='password'
						onChange={handleOnChange}
						autoComplete='off'
					></input>
				</div>
				<div className='edit_store_input'>
					<div className='edit_store_label'>Confirm Password</div>
					<input
						className='edit_store_input'
						id='c_password'
						value={store.c_password}
						type='password'
						onChange={handleOnChange}
						autoComplete='off'
					></input>
				</div>
			</div>
			<div className='btn_store_container noselect'>
				<div className='btn_store_action save' onClick={handleSubmit}>
					เพิ่มร้านค้า
				</div>
				<div className='btn_store_action cancle' onClick={handleOnCancle}>
					ยกเลิก
				</div>
			</div>
		</div>
	);
};

const EditStore = ({ store, callbackOnChange }) => {
	const handleOnChange = (e) => {
		callbackOnChange(e);
	};

	const handleOnCancle = (e) => {
		callbackOnChange({
			name: '',
			display_name: '',
			username: '',
			password: '',
			c_password: '',
		});
	};

	return (
		<div className='edit_store_container'>
			<div className='edit_store_title_label noselect'>ข้อมูลของร้านค้า</div>

			<div className='edit_store_input'>
				<div className='edit_store_label'>ชื่อร้านค้า</div>
				<input
					className='edit_store_input'
					value={store && store.name}
					id='name'
					autoComplete='off'
				></input>
			</div>
			<div className='user_store_container'>
				<div className='edit_store_title'>ข้อมูลผู้ใช้งาน</div>
				<div className='edit_store_input'>
					<div className='edit_store_label'>Display name</div>
					<input
						className='edit_store_input'
						value={store && store.owner.display_name}
						id='display_name'
						onChange={handleOnChange}
						autoComplete='off'
					></input>
				</div>
				<div className='edit_store_input'>
					<div className='edit_store_label'>Username</div>
					<input
						className='edit_store_input'
						value={store && store.owner.username}
						id='username'
						autoComplete='off'
					></input>
				</div>
				<div className='edit_store_input'>
					<div className='edit_store_label'>Password</div>
					<input
						className='edit_store_input'
						id='password'
						type='password'
						autoComplete='off'
						placeholder='ตั้งรหัสผ่านใหม่'
					></input>
				</div>
			</div>
			<div className='btn_store_container noselect'>
				<div className='btn_store_action save'>ปรับปรุง</div>
				<div className='btn_store_action cancle' onClick={handleOnCancle}>
					ยกเลิก
				</div>
			</div>
		</div>
	);
};

const getInfo = async (username) => {
	const config = {
		method: 'get',
		url: `/store`,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await apiClient(config);
		if (res.data.status === 'success') {
			return res.data.message.store;
		} else {
			return [];
		}
	} catch (error) {
		return [];
	}
};

export default Store;
