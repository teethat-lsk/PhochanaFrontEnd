import react, { useState, useEffect } from 'react';
import { MainHeaderContainer, MainFooterBox } from '../../screens/Main';
import apiClient from '../../middleware/ApiClient';
import moment from 'moment';
import './ExerciseView.css';

const ExerciseView = () => {
	const [data, setData] = useState([]);

	useEffect(async () => {
		var config = {
			method: 'get',
			url: '/exercises/user',
		};
		const res = await apiClient(config);
		if (res.data.status === 'success') {
			// console.log(res.data.message);
			setData(res.data.message.exercises);
		} else {
			// console.log('something wrong');
		}
	}, []);

	return (
		<div className='fade_effect'>
			<MainHeaderContainer menu={false} title={'My Exercises'} />
			<div className='exercise_view_container'>
				{data &&
					data.map((e, key) => {
						// console.log(e);

						return <ExerciseCard key={key} data={e} />;
					})}
			</div>

			<MainFooterBox />
		</div>
	);
};

const ExerciseCard = ({ data }) => {
	console.log(data);
	return (
		<div className='exercise_container'>
			<div>{moment(data.start_at).format('DD-MM-YYYY, h:mm a')}</div>
			<div>
				<div>{data.exercise_id.name}</div>
				<div>{data.time} Minutes</div>
				<div>{data.exercise_id.cal_p_h * data.time} KCal</div>
			</div>
		</div>
	);
};

export default ExerciseView;
