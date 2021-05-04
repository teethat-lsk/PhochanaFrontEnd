import raect, { useState, useEffect } from 'react';
import { MainHeaderContainer, MainFooterBox } from '../../screens/Main';
import apiClient from '../../middleware/ApiClient';
import GetImage from '../../middleware/GetImage';
import './Achievement.css';

const Achievement = () => {
	const [data, setData] = useState([]);
	useEffect(async () => {
		var config = {
			method: 'get',
			url: '/achievement',
		};
		const res = await apiClient(config);
		if (res.data.status === 'success') {
			// console.log(res.data.message);
			// console.log(res.data.message.achievemant);
			setData(res.data.message.achievemant);
		} else {
			// console.log('something wrong');
		}
	}, []);
	return (
		<div className='fade_effect'>
			<MainHeaderContainer menu={false} title={'Achievements'} />
			<div className='achievement_body_container'>
				{data &&
					data.map((e, key) => {
						console.log(e);
						return <AchievementCard key={key} data={e} />;
					})}
			</div>
			<MainFooterBox />
		</div>
	);
};

const AchievementCard = ({ data }) => {
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
		<div className='achievement_container'>
			<div className='icon_container'>
				<img className='achievement_icon' src={_image} />
			</div>
			<div className='___name'>{data.name}</div>
		</div>
	);
};

export default Achievement;
