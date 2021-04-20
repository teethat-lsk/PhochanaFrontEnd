import React, { useState, useEffect } from "react";
import { MainHeaderContainer, MainFooterBox } from "../Main";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "../../styles/Exercises/ExerciseDeco.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
function ExerciseMain() {
  // ---------------------------- Time Start Exercise ------------------------------------
  var myCurrentDate = new Date();

  if (myCurrentDate.getHours() < 10 && myCurrentDate.getMinutes() < 10) {
    var date =
      "0" + myCurrentDate.getHours() + ":" + "0" + myCurrentDate.getMinutes();
  } else if (myCurrentDate.getHours() < 10) {
    var date =
      "0" + myCurrentDate.getHours() + ":" + myCurrentDate.getMinutes();
  } else if (myCurrentDate.getMinutes() < 10) {
    var date =
      myCurrentDate.getHours() + ":" + "0" + myCurrentDate.getMinutes();
  } else {
    var date = myCurrentDate.getHours() + ":" + myCurrentDate.getMinutes();
  }

  var newCurrentDate = "2014-08-18T" + date + ":54";
  // const newCurrentDate = "2014-08-18T21:11:54";

  const [selectedDate, setSelectedDate] = React.useState(
    new Date(newCurrentDate)
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const materialTheme = createMuiTheme({
    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: "black",
        },
      },
      MuiPickersCalendarHeader: {
        switchHeader: {
          // backgroundColor: lightBlue.A200,
          // color: "white",
        },
      },
      MuiGrid: {
        backgroundcolor: "blue",
      },
      MuiTextField: {},
    },
  });

  const [count, setCount] = useState(1050);

  // ---------------------------- Time Exercise ------------------------------------
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 30,
      minHeight: 5,
      padding: 0,
      marginTop: 0,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
      minWidth: 30,
    },
    MenuItem: {
      minWidth: 30,
    },
  }));

  const classes = useStyles();

  const [timeExerciseHr, settimeExerciseHr] = React.useState(0);
  const [timeExerciseMn, settimeExerciseMn] = React.useState(0);

  const handleChangeHr = (event) => {
    settimeExerciseHr(event.target.value);
  };
  const handleChangeMn = (event) => {
    settimeExerciseMn(event.target.value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 60,
      },
    },
  };

  // ---------------------------- Calculate Burn ------------------------------------

  return (
    <div className='windowE'>
      <div className='windowS'>
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
                setCount(1050), console.log(`${selectedDate.getHours()}`);
              }}
              className='exerciseButton'
            >
              <label className='textExercise'>วิ่ง</label>
            </button>
          </SwiperSlide>
          <SwiperSlide className='boxSlide'>
            <button
              onClick={() => {
                setCount(425), console.log({ timeExerciseHr });
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
            {/* <form className={useStyles().container} noValidate>
              <TextField
                id='time'
                type='time'
                defaultValue={newCurrentDate}
                className={useStyles().textField}
                onChange={(date) => setSelectedDate(date)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
              
            </form> */}
            <div className='pickBox'>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify='space-around'>
                  <ThemeProvider theme={materialTheme}>
                    <KeyboardTimePicker
                      margin='normal'
                      id='time-picker'
                      label=''
                      defaultValue={newCurrentDate}
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </ThemeProvider>
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
            <label className='timeAll'>เวลาทั้งหมดที่ใช้ในการออกกำลังกาย</label>
            {/* <form onSubmit={handleSubmit} className='fAllTime'>
              <input
                type='text'
                value={timeLength}
                required
                onChange={(e) => setTimeLength(e.target.value)}
                className='timeInput'
              />
              <input type='submit' className='timeSubmit'></input>
            </form> */}
            <div className='timeExerciseBox'>
              <div>
                <FormControl className={classes.formControl}>
                  <Select
                    value={timeExerciseHr}
                    onChange={handleChangeHr}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ "aria-label": "Without label" }}
                    MenuProps={MenuProps}
                  >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                  </Select>
                  <FormHelperText>ชั่วโมง</FormHelperText>
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Select
                    value={timeExerciseMn}
                    onChange={handleChangeMn}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ "aria-label": "Without label" }}
                    MenuProps={MenuProps}
                  >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>

                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={11}>11</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={13}>13</MenuItem>
                    <MenuItem value={14}>14</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={16}>16</MenuItem>
                    <MenuItem value={17}>17</MenuItem>
                    <MenuItem value={18}>18</MenuItem>
                    <MenuItem value={19}>19</MenuItem>

                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={21}>21</MenuItem>
                    <MenuItem value={22}>22</MenuItem>
                    <MenuItem value={23}>23</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                    <MenuItem value={25}>225</MenuItem>
                    <MenuItem value={26}>26</MenuItem>
                    <MenuItem value={27}>27</MenuItem>
                    <MenuItem value={28}>28</MenuItem>
                    <MenuItem value={29}>29</MenuItem>

                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={31}>31</MenuItem>
                    <MenuItem value={32}>32</MenuItem>
                    <MenuItem value={33}>33</MenuItem>
                    <MenuItem value={34}>34</MenuItem>
                    <MenuItem value={35}>35</MenuItem>
                    <MenuItem value={36}>36</MenuItem>
                    <MenuItem value={37}>37</MenuItem>
                    <MenuItem value={38}>38</MenuItem>
                    <MenuItem value={39}>39</MenuItem>

                    <MenuItem value={40}>40</MenuItem>
                    <MenuItem value={41}>41</MenuItem>
                    <MenuItem value={42}>42</MenuItem>
                    <MenuItem value={43}>43</MenuItem>
                    <MenuItem value={44}>44</MenuItem>
                    <MenuItem value={45}>45</MenuItem>
                    <MenuItem value={46}>46</MenuItem>
                    <MenuItem value={47}>47</MenuItem>
                    <MenuItem value={48}>48</MenuItem>
                    <MenuItem value={49}>49</MenuItem>

                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={51}>51</MenuItem>
                    <MenuItem value={52}>52</MenuItem>
                    <MenuItem value={53}>53</MenuItem>
                    <MenuItem value={54}>54</MenuItem>
                    <MenuItem value={55}>55</MenuItem>
                    <MenuItem value={56}>56</MenuItem>
                    <MenuItem value={57}>57</MenuItem>
                    <MenuItem value={58}>58</MenuItem>
                    <MenuItem value={59}>59</MenuItem>
                  </Select>
                  <FormHelperText>นาที</FormHelperText>
                </FormControl>
              </div>
            </div>
          </div>
          <div className='cBox2'>
            <div className='cTop'>
              <label className='burnAll'>เผาผลาญทั้งหมด</label>
              <label className='valBurn'>
                {((parseInt(timeExerciseHr, 10) * 60 +
                  parseInt(timeExerciseMn, 10)) *
                  count) /
                  60}
              </label>
              <label className='cal1'>แคลอรี่</label>
            </div>
            <div className='cBottom'>
              <label className='burnLeft'>เหลือที่ต้องเผาผลาญอีก</label>
              <label className='valLeft'> ?? </label>
              <label className='cal2'>แคลอรี่</label>
            </div>
          </div>
        </div>
      </div>
      <MainFooterBox />
    </div>
  );
}

export default ExerciseMain;
