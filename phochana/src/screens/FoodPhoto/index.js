import react, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Camera } from './camera';
import apiClient from '../../middleware/ApiClient';
import { MainHeaderContainer } from '../Main';
import Moment from 'react-moment';
import testImage from './images/ข้าวมันไก่.jpg';
import { exportComponentAsJPEG } from 'react-component-export-image';
import { frontend } from '../../config';
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from '@reach/combobox';
import { FacebookIcon, FacebookShareButton } from 'react-share';
import '@reach/combobox/styles.css';
import '../../styles/FoodPhoto/FoodPhoto.css';
import Swal from 'sweetalert2';
import Compressor from 'compressorjs';
import '../../styles/Exercises/sweetalert2.scss';

const FoodPhoto = () => {
	const [loading, setLoading] = useState(false);
	const [cardImage, setCardImage] = useState();
	const [foodSelect, setFoodSelect] = useState();
	const [foodData, setFoodData] = useState({
		image_process: { name: 'กำลังประมวลผล!', calorie: 0 },
		process_with_ml: false,
	});
	const [bmr, setBmr] = useState(0);
	const [saved, setSaved] = useState(false);

	const handleLoading = (status) => {
		setLoading(status);
	};

	useEffect(async () => {
		try {
			const res = await getUserBMR();
			if (res) {
				setBmr(res.bmr);
			}
		} catch (err) {}
	}, []);

	useEffect(async () => {
		if (cardImage) {
			setLoading(true);

			// console.log(result);
			const res = await preProcessImage(cardImage);
			// console.log(res);
			if (res) {
				setFoodData(res.message);
				// console.log('set');
			}
			setLoading(false);
		}
	}, [cardImage]);

	return (
		<div className='foodphoto_container fade_effect'>
			<MainHeaderContainer menu={false} />
			{cardImage ? (
				saved ? (
					<PhotoSave
						cardImage={cardImage}
						imageName={foodSelect.name}
						cal={foodSelect.calorie}
					/>
				) : (
					<PhotoPreview
						cardImage={cardImage}
						foodData={foodData}
						loading={loading}
						handleLoading={handleLoading}
						foodSelect={foodSelect}
						setFoodSelect={setFoodSelect}
						setSaved={setSaved}
					/>
				)
			) : (
				<TakePhoto setCardImage={setCardImage} bmr={bmr} />
			)}
		</div>
	);
};

const PhotoSave = ({ cardImage, imageName, cal }) => {
	const refSave = useRef();

	const download = () => {
		exportComponentAsJPEG(refSave, {
			fileName: 'PhoChana' + '_' + new Date().getTime() + '.jpeg',
		});
		// console.log('saved image!');
	};

	const history = useHistory();
	return (
		<div className='foodphoto_container fade_effect'>
			<div className='container_for_save' ref={refSave}>
				<img
					src={cardImage && URL.createObjectURL(cardImage)}
					className='image_box'
				></img>
				<div className='box_label'>
					<div> @PhoChana |</div>
					<div>
						{imageName} | {cal} KCal{' '}
					</div>
				</div>
			</div>
			<div className='btn_container_save'>
				<div
					className='btn_food_photo btn_s_save __save'
					onClick={() => {
						download();
					}}
				>
					บันทึกรููปภาพลงมือถือ
				</div>
				{/* <FacebookShareButton
					url='www.facebook.com'
					quote='test'
					hashtag='#PhoChana'
					className='btn_food_photo btn_s_save __share'
					// onClick={() => {}}
				>
					<FacebookIcon size={45} round={true} style={{ marginRight: '5px' }} />{' '}
					แชร์
				</FacebookShareButton> */}
				<div
					className='btn_food_photo btn_s_save __close'
					onClick={() => {
						history.push('/');
					}}
				>
					ปิด
				</div>
			</div>
		</div>
	);
};

const PhotoPreview = ({
	cardImage,
	foodData,
	loading,
	handleLoading,
	foodSelect,
	setFoodSelect,
	setSaved,
}) => {
	const [foodList, setFoodList] = useState([]);
	const [toggle, setToggle] = useState(false);
	// console.log(foodData);
	// console.log(cardImage);
	const HandleSweetSuccess = () => {
		Swal.fire({
			title: 'บันทึกสำเร็จ',
			text: '',
			type: 'success',
		});
	};

	const HandleSweetFail = () => {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
			footer: '<a href>การบันทึกข้อมูลผิดพลาด กรุณาติดต่อผู้ดูแล</a>',
		});
	};

	const handleOnSelect = (e) => {
		// console.log(e);
	};

	useEffect(() => {
		if (foodData.process_with_ml) {
			setFoodSelect(foodData.image_process);
			setFoodList(foodData.food_list);
			// console.log('Process with ML!');
		}
	}, [foodData.process_with_ml]);

	useEffect(() => {
		// console.log('food select update!', foodSelect);
	}, [foodSelect]);

	const handleSubmit = async () => {
		if (!loading) {
			// call api submit
			handleLoading(true);
			console.log('calling api!');
			try {
				const res = await saveImage(cardImage, foodSelect._id);
				if (res.status === 'success') {
					HandleSweetSuccess();
					setSaved(true);
				} else {
					HandleSweetFail();
				}
				console.log(res);
			} catch (err) {
				console.log(err.message);
			} finally {
				handleLoading(false);
			}
		}
	};

	return (
		<div>
			<div className='food_photo_preview_container fade_effect'>
				<div className='report_foodphoto'>
					<div className='icon_report'>
						<i class='fa fa-flag' aria-hidden='true'></i>
					</div>
				</div>
				<img
					className='image_container'
					src={cardImage && URL.createObjectURL(cardImage)}
				/>
				{foodData.process_with_ml && toggle ? (
					<Combobox
						aria-labelledby='demo'
						className='food_photo_name_combo_container'
						onSelect={(e) => {
							handleOnSelect(e);
						}}
					>
						<ComboboxInput
							// value={foodSelect && foodSelect.name}
							className='food_photo_name_combo_input'
						/>
						<ComboboxPopover>
							<ComboboxList>
								{foodList.map((e, key) => {
									return (
										<ComboboxOption
											className='combo_label'
											value={e.name}
											key={key}
											onClick={(e) => {
												setFoodSelect(foodList[key]);
												// console.log('clicked', key);
											}}
										/>
									);
								})}
							</ComboboxList>
						</ComboboxPopover>
					</Combobox>
				) : (
					<div
						className='food_photo_name'
						onClick={() => {
							setToggle(true);
						}}
					>
						{foodData.image_process.name}
					</div>
				)}

				<div className='food_photo_cal'>
					{(foodData.process_with_ml && foodSelect && foodSelect.calorie) ||
						foodData.image_process.calorie}{' '}
					KCal
				</div>

				<div
					className='btn_food_photo btn_save'
					style={{ backgroundColor: loading && 'gray' }}
					onClick={() => {
						!loading && handleSubmit();
					}}
				>
					บันทึก
				</div>
			</div>
		</div>
	);
};

const TakePhoto = ({ setCardImage, openImageDialog, bmr }) => {
	const ref = useRef(null);

	const [isCameraOpen, setIsCameraOpen] = useState(true);
	// const [cal, setCal] = useState(1000);
	return (
		<div>
			<div className='food_photo_container'>
				{isCameraOpen && (
					<Camera
						onCapture={async (blob) => {
							const result = await new Promise((resolve, reject) => {
								new Compressor(blob, {
									quality: 0.2,
									convertSize: 0,
									success: resolve,
									error: reject,
								});
							});
							setCardImage(result);
						}}
						onClear={() => setCardImage(undefined)}
					/>
				)}
				<input
					type='file'
					style={{ display: 'none' }}
					ref={ref}
					onChange={async (e) => {
						const file = e.target.files[0];
						if (!file) {
							return;
						}
						const result = await new Promise((resolve, reject) => {
							new Compressor(file, {
								quality: 0.2,
								convertSize: 0,
								success: resolve,
								error: reject,
							});
						});
						setCardImage(result);
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
				<div className='cal_rec_label'>{`แคลอรี่แนะนำสำหรับมื้อนี้ ${(
					(bmr || 0) / 3
				).toFixed(0)} KCal`}</div>
				<Moment
					className='food_photo_timestamp'
					format='MMMM Do YYYY, h:mm:ss a'
					date={new Date()}
				/>
			</div>
		</div>
	);
};

const saveImage = async (cardImage, food_id) => {
	let bodyFormData = new FormData();
	bodyFormData.append('image', cardImage);
	bodyFormData.append('food_id', food_id);
	const config = {
		method: 'post',
		url: '/foodphoto',
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

const getUserBMR = async () => {
	const config = {
		method: 'get',
		url: `/users/bmr`,
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

export default FoodPhoto;
