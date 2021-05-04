import raect, { useState, useEffect } from 'react';
import { MainHeaderContainer, MainFooterBox } from '../../screens/Main';
import apiClient from '../../middleware/ApiClient';
import GetImage from '../../middleware/GetImage';
import { useParams } from 'react-router-dom';
import './Achievement.css';

const Achievement = () => {
	// let { id } = useParams();
	// console.log(id);
	const [data, setData] = useState([]);
	const [selected, setSelect] = useState();
	useEffect(async () => {
		try {
			var config = {
				method: 'get',
				url: '/achievement',
			};
			let res = await apiClient(config);
			let temp;
			if (res.data.status === 'success') {
				// console.log(res.data.message);
				// console.log(res.data.message.achievemant);
				temp = res.data.message.achievemant;
			} else {
				// console.log('something wrong');
			}
			var config = {
				method: 'get',
				url: '/userachievement?username=me',
			};
			res = await apiClient(config);
			if (res.data.status === 'success') {
				// console.log(res.data.message);
				// console.log(res.data.message.user_achievement);
				// setDoData();
				res.data.message.user_achievement.map((e, key) => {
					// console.log(e);
					const found = temp.find((element) => element._id == e.target);
					const index = temp.indexOf(found);
					temp[index].success = true;
				});
				setData(temp);
			} else {
				// console.log('something wrong');
			}
		} catch (err) {}
	}, []);
	return (
		<div className='fade_effect'>
			<MainHeaderContainer menu={false} title={'Achievements'} />
			<div className='achievement_body_container'>
				{selected ? (
					<ShowCard data={selected} />
				) : (
					data &&
					data.map((e, key) => {
						// console.log(e);
						const handleOnClick = () => {
							setSelect(e);
							// console.log(e);
						};
						return (
							<AchievementCard onClick={handleOnClick} key={key} data={e} />
						);
					})
				)}
			</div>
			{selected ? (
				<div
					className='btn__close'
					onClick={() => {
						setSelect();
					}}
				>
					ปิด
				</div>
			) : (
				<MainFooterBox />
			)}
		</div>
	);
};

const AchievementCard = ({ data, onClick }) => {
	// console.log(data);
	const [_image, setImage] = useState();
	useEffect(async () => {
		if (data) {
			try {
				const temp = await GetImage(data.icon);
				setImage(temp);
			} catch (err) {}
		}
	}, [data.icon]);
	// console.log(data);
	return (
		<div
			onClick={onClick}
			className='achievement_container'
			style={{ backgroundColor: `${data.success ? 'green' : ''}` }}
		>
			<div className='icon_container'>
				<img className='achievement_icon' src={_image} />
			</div>
			<div className='___name'>{data.name}</div>
		</div>
	);
};

const ShowCard = ({ data }) => {
	const [_image, setImage] = useState();
	useEffect(async () => {
		if (data) {
			try {
				const temp = await GetImage(data.icon);
				setImage(temp);
			} catch (err) {}
		}
	}, [data.icon]);
	return (
		<div className='ach_body'>
			<div
				className='achievement_container'
				style={{ backgroundColor: `${data.success ? 'green' : ''}` }}
			>
				<div className='icon_container'>
					<img className='achievement_icon' src={_image} />
				</div>
				<div className='___name'>{data.name}</div>
			</div>
			<div>{data.description}</div>
		</div>
	);
};

export default Achievement;
