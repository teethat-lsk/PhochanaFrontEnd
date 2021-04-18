import React, { useState, useEffect } from "react";
import { MainHeaderContainer, MainFooterBox } from "../Main";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "../../styles/Exercises/ExerciseDeco.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

function ExerciseMain() {
  var myCurrentDate = new Date();
  if (myCurrentDate.getHours() < 10) {
    var date =
      "0" + myCurrentDate.getHours() + ":" + myCurrentDate.getMinutes();
  } else {
    var date = myCurrentDate.getHours() + ":" + myCurrentDate.getMinutes();
  }

  const newCurrentDate = date;
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
      paddingLeft: "50%",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 150,
      padding: "3%",
      backgroundColor: "white",
    },
  }));
  const [count, setCount] = useState(1050);

  useEffect(() => {});
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
          <button
            onClick={() => {
              setCount(1050), console.log(`${newCurrentDate}`);
            }}
            className='exerciseButton'
          >
            <label className='textExercise'>วิ่ง</label>
          </button>
        </SwiperSlide>
        <SwiperSlide className='boxSlide'>
          <button
            onClick={() => {
              setCount(425);
            }}
            className='exerciseButton'
          >
            <label className='textExercise'>ขี่จักรยาน</label>
          </button>
        </SwiperSlide>
        <SwiperSlide className='boxSlide'>
          <button
            onClick={() => {
              setCount(600);
            }}
            className='exerciseButton'
          >
            <label className='textExercise'> แอโรบิค</label>
          </button>
        </SwiperSlide>
        <SwiperSlide className='boxSlide'>
          <button
            onClick={() => {
              setCount(510);
            }}
            className='exerciseButton'
          >
            <label className='textExercise'>บาสเก็ตบอล</label>
          </button>
        </SwiperSlide>
        <SwiperSlide className='boxSlide'>
          <button
            onClick={() => {
              setCount(300);
            }}
            className='exerciseButton'
          >
            <label className='textExercise'>วอลเล่ย์บอล</label>
          </button>
        </SwiperSlide>
      </Swiper>
      <div className='table'>
        <table className='customers'>
          <tr>
            <th>ระยะเวลา</th>
            <th>ปริมาณแคลอรี่</th>
          </tr>
          <tr>
            <td>30 นาที</td>
            <td>{count * 0.5} แคลอรี่</td>
          </tr>
          <tr>
            <td>60 นาที</td>
            <td>{count} แคลอรี่</td>
          </tr>
          <tr>
            <td>90 นาที</td>
            <td>{count * 1.5} แคลอรี่</td>
          </tr>
          <tr>
            <td>120 นาที</td>
            <td>{count * 2} แคลอรี่</td>
          </tr>
        </table>
      </div>
      <div className='caloryCal'>
        <div className='cBox1'>
          <label className='timeStart'>เวลาที่เริ่มออกกำลังกาย</label>
          <form className={useStyles().container} noValidate>
            <TextField
              id='time'
              type='time'
              defaultValue={newCurrentDate}
              className={useStyles().textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </form>
          <label className='timeAll'>เวลาทั้งหมดที่ใช้ในการออกกำลังกาย</label>
          <form className='fAllTime'>Hello</form>
        </div>
        <div className='cBox2'>
          <div className='cTop'>
            <label className='burnAll'>เผาผลาญทั้งหมด</label>
            <label className='valBurn'>50 </label>
            <label className='cal1'>แคลอรี่</label>
          </div>
          <div className='cBottom'>
            <label className='burnLeft'>เหลือที่ต้องเผาผลาญอีก</label>
            <label className='valLeft'>50 </label>
            <label className='cal2'>แคลอรี่</label>
          </div>
        </div>
      </div>
      <MainFooterBox />
    </div>
  );
}

export default ExerciseMain;
