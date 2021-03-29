import React from "react";
import { MainHeaderContainer, MainFooterBox } from "../Main";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "../../styles/Exercises/ExerciseDeco.css";

function ExerciseMain() {
  const buttonRun = () => {
    console.log("Run");
  };
  return (
    <div className='windowE'>
      <MainHeaderContainer title={"Exercise"} />
      <Swiper
        spaceBetween={5}
        slidesPerView={3}
        freeMode={true}
        className='eBox'
      >
        <SwiperSlide className='boxSlide'>
          <button onClick={buttonRun} className='exerciseButton'>
            <label className='textExercise'>วิ่ง</label>
          </button>
        </SwiperSlide>
        <SwiperSlide className='boxSlide'>
          <button onClick={buttonRun} className='exerciseButton'>
            <label className='textExercise'>นอน</label>
          </button>
        </SwiperSlide>
        <SwiperSlide className='boxSlide'>
          <button onClick={buttonRun} className='exerciseButton'>
            <label className='textExercise'>กลิ้ง</label>
          </button>
        </SwiperSlide>
        <SwiperSlide className='boxSlide'>
          <button onClick={buttonRun} className='exerciseButton'>
            <label className='textExercise'>ตีลังกา</label>
          </button>
        </SwiperSlide>
        <SwiperSlide className='boxSlide'>
          <button onClick={buttonRun} className='exerciseButton'>
            <label className='textExercise'>เมา</label>
          </button>
        </SwiperSlide>
      </Swiper>
      <div className='table'>ตารางการออกกำลังกาย</div>

      <div className='caloryCal'>คำนวนแคลอรี่</div>
      <MainFooterBox />
    </div>
  );
}

export default ExerciseMain;
