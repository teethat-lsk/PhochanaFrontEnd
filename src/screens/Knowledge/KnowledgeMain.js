import React from 'react';
import { MainHeaderContainer, MainFooterBox } from '../Main';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './know.css';
import data from './k_data.js';
import img from './o.jpg';
function KnowledgeMain() {
	//data = data.sort(() => Math.random() - 0.5);
	return (
		<div>
			<MainHeaderContainer title={'Knowledge'} />
			<Swiper
				spaceBetween={30}
				slidesPerView={1}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
				className='kBox'
			>
				{data.map((user) => (
					<SwiperSlide key={user.id_kn} className='slide'>
						<div className='slide-content'>
							<div className='content_topic'>
								<label className='textTopic'>{user.topic}</label>
							</div>
							<div className='content_photo'>
								<img src={img} className='h' />
							</div>
							<div className='content_data'>
								<label className='textContent'>{user.data_}</label>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<MainFooterBox />
		</div>
	);
}

export default KnowledgeMain;
