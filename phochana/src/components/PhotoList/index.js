import './PhotoList.css';
import apiClient from '../../middleware/ApiClient';
import GetImage from '../../middleware/GetImage';
import { MainHeaderContainer } from '../../screens/Main';
import moment from 'moment';
import react, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PhotoList = () => {
	const [foodPhotoList, setFoodPhotoList] = useState([]);
	const [listComponent, setComponent] = useState();
	useEffect(async () => {
		const res = await getInfo();
		setFoodPhotoList(res);
	}, []);

	useEffect(async () => {
		if (foodPhotoList) {
			// console.log(foodPhotoList);
			let temp = [];
			for (let i = 0; i < foodPhotoList.length; i++) {
				for (let j = 0; j < foodPhotoList[i].food_photo.length; j++) {
					const tempImage = await GetImage(
						foodPhotoList[i].food_photo[j].image
					);
					// console.log(tempImage);
					const timeStamp =
						j + 1 === foodPhotoList[i].food_photo.length
							? foodPhotoList[i].date
							: '';
					temp.push(
						<Link
							to={`/photoview/${foodPhotoList[i].food_photo[j]._id}`}
							className='photo_list_cell'
							key={i + j}
							style={{ backgroundImage: `url(${tempImage})` }}
						>
							<div
								style={{
									background: 'rgba(100,100,100,0.5)',
									color: 'white',
									fontSize: '12px',
									paddingLeft: '4px',
									width: '80px',
									textAlign: 'center',
								}}
							>
								{timeStamp}
							</div>
						</Link>
					);
				}
			}
			setComponent(temp);
		}
	}, [foodPhotoList]);

	return (
		<div className='fade_effect'>
			<MainHeaderContainer
				menu={false}
				title={''}
				right={'change'}
				to={'/photocalendar'}
			/>
			<div className='photo_list_container'>
				<div className='photo_list_table'>{listComponent}</div>
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
			return res.data.message.group_food_photo;
		} else {
			return null;
		}
	} catch (error) {
		console.log(error.message);
		return null;
	}
};

export default PhotoList;
