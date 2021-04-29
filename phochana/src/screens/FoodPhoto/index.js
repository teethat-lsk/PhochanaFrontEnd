import react, { useState, useRef, useEffect } from 'react';
import { Camera } from './camera';
import { Preview } from './styles';
import { MainHeaderContainer } from '../Main';
import Moment from 'react-moment';
import testImage from './images/ข้าวมันไก่.jpg';
import { frontend } from '../../config';
import '../../styles/FoodPhoto/FoodPhoto.css';

function FoodPhoto() {
	const [cardImage, setCardImage] = useState();

	useEffect(() => {
		if (cardImage) {
		}
	}, [cardImage]);

	return (
		<div className='foodphoto_container'>
			<MainHeaderContainer menu={false} />
			{cardImage ? (
				<PhotoPreview cardImage={cardImage} />
			) : (
				<TakePhoto setCardImage={setCardImage} />
			)}
		</div>
	);
}

const PhotoPreview = ({ cardImage }) => {
	const [name, setName] = useState('Test');
	const [cal, setCal] = useState(100);
	return (
		<div>
			<div className='food_photo_preview_container'>
				<img
					className='image_container'
					src={cardImage && URL.createObjectURL(cardImage)}
				/>
				<div className='food_photo_name'>{name}</div>
				<div className='food_photo_cal'>{cal} KCal</div>
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

{
	/* <button onClick={() => setIsCameraOpen(true)}>Open Camera</button>
<button
	onClick={() => {
		setIsCameraOpen(false);
		setCardImage(undefined);
	}}
>
	Close Camera
</button> */
}
export default FoodPhoto;
