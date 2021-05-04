import Calendar from 'react-calendar';
// import { useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../middleware/ApiClient';
import GetImage from '../../middleware/GetImage';
import './CalendarFood.css';
import { MainHeaderContainer } from '../../screens/Main';
import moment from 'moment';
import { useEffect, useState } from 'react';

const CalendarFood = () => {
	const [foodPhotoList, setFoodPhotoList] = useState([]);
	useEffect(async () => {
		try {
			const res = await getInfo();
			if (res) setFoodPhotoList(res.group_food_photo);
		} catch (err) {}
		// console.log(res.group_food_photo);
	}, []);

	return (
		<div className='fade_effect'>
			<MainHeaderContainer
				menu={false}
				title={''}
				right={'change'}
				to={'/photolist'}
			/>
			<ShowWithCalendar foodPhotoList={foodPhotoList} />
		</div>
	);
};

const ShowWithCalendar = ({ foodPhotoList }) => {
	// console.log(foodPhotoList);
	const [photoBox, setPhotoBox] = useState([]);

	const onChangeHandle = async (eDate) => {
		const findDate = foodPhotoList.find((data) => {
			// console.log(date === moment(_date).format('DD-MM-YYYY'));
			return data.date === moment(eDate).format('DD-MM-YYYY');
		});
		if (findDate) {
			for (var index = 0; index < findDate.food_photo.length; index++) {
				findDate.food_photo[index]._image = await GetImage(
					findDate.food_photo[index].image
				);
			}
			setPhotoBox(findDate.food_photo);
		} else {
			setPhotoBox([]);
		}
	};

	return (
		<div>
			<div className='calendar_food_container'>
				<div className='show_with_calendar_container'>
					<Calendar
						onChange={onChangeHandle}
						maxDate={new Date()}
						locale='th' // th
						tileClassName={({ date, view }) => {
							const findDate = foodPhotoList.find((data) => {
								// console.log(date === moment(_date).format('DD-MM-YYYY'));
								return data.date === moment(date).format('DD-MM-YYYY');
							});
							if (findDate) {
								// console.log('found');
								switch (findDate.type) {
									case 'normal':
										return 'good_hightlight';
									case 'more':
										return 'bad_hightlight';
									case 'less':
										return 'warm_hightlight';
								}
							}
						}}
					/>
					<div className='display_photo_all_day'>
						<div className='display_photo_container'>
							{photoBox.map((e, key) => {
								return (
									<Link
										to={`/photoview/${e._id}`}
										className='preview_image'
										key={key}
										style={{ backgroundImage: `url(${e._image})` }}
									></Link>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			<div className='calendar_food_footer'>
				<div>
					<span style={{ color: 'red' }}>สีแดง : </span>
					ได้รับมากกว่าที่ร่างกายต้องการ
					<br />
					<br />
					<span style={{ color: 'green' }}>สีเขียว : </span>
					ได้รับตามที่ร่างกายต้องการ
					<br />
					<br />
					<span style={{ color: 'yellow' }}>สีเหลือง : </span>
					ได้รับน้อยกว่าที่ร่างกายต้องการ
				</div>
			</div>
		</div>
	);
};

const getInfo = async () => {
	const config = {
		method: 'get',
		url: `/foodphoto`,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await apiClient(config);
		if (res.data.status === 'success') {
			return res.data.message;
		} else {
			return null;
		}
	} catch (error) {
		console.log(error.message);
		return null;
	}
};

export default CalendarFood;
