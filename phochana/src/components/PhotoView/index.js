import react, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import './PhotoView.css';
import apiClient from '../../middleware/ApiClient';
import GetImage from '../../middleware/GetImage';
import { MainHeaderContainer } from '../../screens/Main';
import moment from 'moment';

const PhotoView = () => {
	const { id } = useParams();
	const [photoData, setData] = useState(null);
	useEffect(async () => {
		console.log('loaded', id);
		if (id == null) {
			// console.log('?');
			return;
		}
		try {
			let res = await getInfo(id);
			res.food_photo._image = await GetImage(res.food_photo.image);
			// console.log(res);
			setData(res.food_photo);
		} catch (err) {}
	}, []);

	useEffect(() => {
		if (photoData) {
			// console.log(photoData);
		}
	}, [photoData]);
	// console.log('loaded');
	return (
		<div className='fade_effect'>
			{id === undefined && <Redirect to='/404' />}
			<MainHeaderContainer menu={false} title={''} />
			<div className='photo_view_container'>
				<div style={{ padding: '10px' }}>
					<div
						style={{ backgroundImage: `url(${photoData && photoData._image})` }}
						className='photo_view_img'
					/>
				</div>
				<div className='photo_view_title'>
					<br />
					<div
						style={{ fontSize: '20px', color: 'white', marginBottom: '10px' }}
					>
						{photoData && photoData.food_id.name}
					</div>
					<div className='sub_title'>
						<div className='_title'>แคลลอรี่ : </div>
						<div className='__title'>
							{photoData && photoData.food_id.calorie} KCal
						</div>
					</div>
					<div className='sub_title'>
						<div className='_title'>เวลา : </div>
						<div className='__title'>
							{photoData && moment(photoData.create_at).format('LTS')}
						</div>
					</div>
					<div className='sub_title'>
						<div className='_title'>วันที่ : </div>
						<div className='__title'>
							{photoData && moment(photoData.create_at).format('DD-MM-YYYY')}
						</div>
					</div>
					<br />
				</div>
			</div>
		</div>
	);
};

const getInfo = async (url) => {
	const config = {
		method: 'get',
		url: `/foodphoto/${url}`,
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

export default PhotoView;
