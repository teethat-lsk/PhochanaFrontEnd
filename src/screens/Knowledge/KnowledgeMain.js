import React from "react";
import { MainHeaderContainer, MainFooterBox } from "../Main";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "../../styles/Knowledges/knowDeco.css";
import dataArray from "./KnowledgeData.js";
// var data = dataArray.sort(() => Math.random() - 0.5);
var data = dataArray;
function KnowledgeMain() {
  return (
    <div>
      <MainHeaderContainer title={"Knowledge"} />
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
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
                <img src={user.photoPlace} className='photoKnowledge' />
              </div>
              <div className='content_data'>
                <p className='textContent'>{user.data1_}</p>
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
