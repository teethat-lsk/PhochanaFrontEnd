import react, { useState, useRef, useEffect } from 'react';
import { Camera } from './camera';
import apiClient from '../../middleware/ApiClient';
import { MainHeaderContainer } from '../Main';
import Moment from 'react-moment';
import testImage from './images/ข้าวมันไก่.jpg';
import { frontend } from '../../config';
import '../../styles/FoodPhoto/FoodPhoto.css';

const FoodPhoto = () => {
	const [cardImage, setCardImage] = useState();
	const [foodData, setFoodData] = useState({
		image_process: { name: 'unknow', calorie: 0 },
		process_with_ml: false,
	});

	useEffect(async () => {
		if (cardImage) {
			const res = await preProcessImage(cardImage);
			// console.log(res);
			if (res) {
				setFoodData(res.message);
				// console.log('set');
			}
		}
	}, [cardImage]);

	return (
		<div className='foodphoto_container'>
			<MainHeaderContainer menu={false} />
			{cardImage ? (
				<PhotoPreview cardImage={cardImage} foodData={foodData} />
			) : (
				<TakePhoto setCardImage={setCardImage} />
			)}
		</div>
	);
};

const PhotoPreview = ({ cardImage, foodData }) => {
	console.log(foodData);
	if (foodData.process_with_ml) {
		console.log('Process with ML!');
	}
	return (
		<div>
			<div className='food_photo_preview_container'>
				<img
					className='image_container'
					src={cardImage && URL.createObjectURL(cardImage)}
				/>
				<div className='food_photo_name'>{foodData.image_process.name}</div>
				<div className='food_photo_cal'>
					{foodData.image_process.calorie} KCal
				</div>
				<div className='btn_food_photo btn_save'>บันทึก</div>
			</div>
		</div>
	);
};

const TakePhoto = ({ setCardImage, openImageDialog }) => {
	const ref = useRef(null);

	const [isCameraOpen, setIsCameraOpen] = useState(true);
	const [cal, setCal] = useState(1000);
	return (
		<div>
			<div className='food_photo_container'>
				{isCameraOpen && (
					<Camera
						onCapture={(blob) => setCardImage(blob)}
						onClear={() => setCardImage(undefined)}
					/>
				)}
				<input
					type='file'
					style={{ display: 'none' }}
					ref={ref}
					onChange={(e) => {
						setCardImage(e.target.files[0]);
					}}
				></input>
				<div
					className='btn_food_photo nocolor'
					onClick={() => {
						ref.current.click();
					}}
				>
					อัพโหลดรูปภาพ
				</div>
			</div>
			<div className='footer_container'>
				<div className='cal_rec_label'>{`แคลอรี่แนะนำสำหรับมื้อนี้ ${cal} KCal`}</div>
				<Moment
					className='food_photo_timestamp'
					format='MMMM Do YYYY, h:mm:ss a'
					date={new Date()}
				/>
			</div>
		</div>
	);
};

const preProcessImage = async (cardImage) => {
	let bodyFormData = new FormData();
	bodyFormData.append('image', cardImage);
	const config = {
		method: 'post',
		url: '/foodphotopreprocess',
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		data: bodyFormData,
	};

	try {
		const res = await apiClient(config);
		if (res.data.status === 'success') {
			// console.log(res.data);
			return res.data;
		} else {
			// console.log(res);
			return null;
		}
	} catch (err) {
		// console.log(err.message);
		return null;
	}
};
export default FoodPhoto;
