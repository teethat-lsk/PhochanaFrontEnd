import React, { useState, useEffect } from "react";
import { MainHeaderContainer, MainFooterBox } from "../Main";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
//import "swiper/swiper-bundle.css";
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
import apiClient from "../../middleware/ApiClient";
import Swal from "sweetalert2";
import "../../styles/Exercises/sweetalert2.scss";
import Loader from "react-loader-spinner";
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

  var newCurrentDate = "2019-08-18T" + date + ":54";

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
  const [loading, setLodding] = useState(false);

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
  const [userExercise, setUserExercise] = useState([]);

  useEffect(async () => {
    var config = {
      method: "get",
      url: "/exercise",
    };
    const res = await apiClient(config);
    if (res.data.status === "success") {
      setUserExercise(res.data.message.exercises);
      setState(res.data.message.exercises[0]);
    }
  }, []);

  const handleSubmitEx = async (e) => {
    setLodding(true);
    setShowSave(false);
    var nowSend = new Date();
    if (nowSend.getDay() < 10) {
      var d = "0" + nowSend.getDay().toString();
    } else {
      var d = nowSend.getDay().toString();
    }

    if (nowSend.getMonth() < 10) {
      var m = "0" + nowSend.getMonth().toString();
    } else {
      var m = nowSend.getMonth().toString();
    }

    if (nowSend.getFullYear() < 10) {
      var y = "0" + nowSend.getFullYear().toString();
    } else {
      var y = nowSend.getFullYear().toString();
    }

    if (selectedDate.getHours() < 10) {
      var h = "0" + selectedDate.getHours().toString();
    } else {
      var h = selectedDate.getHours().toString();
    }

    if (selectedDate.getMinutes() < 10) {
      var m = "0" + selectedDate.getMinutes().toString();
    } else {
      var m = selectedDate.getMinutes().toString();
    }

    if (selectedDate.getSeconds() < 10) {
      var s = selectedDate.getSeconds().toString();
    } else {
      var s = selectedDate.getSeconds().toString();
    }

    var timeUseAll =
      (timeExerciseHr * 60).toString() + timeExerciseMn.toString();
    console.log(d + m + y + h + m + s);
    console.log("Ready?");
    e.preventDefault();
    const config = {
      method: "post",
      url: `/exercise/user`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        exercise_id: state._id,
        // exercise_id: exID[0],
        time: timeUseAll,
        start_at: d + m + y + h + m + s,
        // g:selectedDate.getDay+selectedDate.getMonth+selectedDate.getFullYear
      }),
    };
    const res = await apiClient(config);
    console.log(res.data.status);
    if (res.data.status === "success") {
      setLodding(false);
      Swal.fire({
        title: "บันทึกสำเร็จ",
        text: "",
        type: "success",
      });
    } else {
      setLodding(false);
      Swal.fire({
        title: "บันทึกไม่สำเร็จ",
        text: "",
        type: "error",
      });
    }
  };

  const [state, setState] = useState({ name: "test", cal_p_h: 0 });

  const [showSave, setShowSave] = useState(false);

  const hourList = [];
  const minuteList = [];
  for (var i = 0; i < 60; i++) {
    if (i < 10) {
      hourList.push(i);
    }
    minuteList.push(i);
  }

  // ---------------------------- Calculate Burn ------------------------------------

  return (
    <div className='windowE'>
      <div className='windowS'>
        <MainHeaderContainer title={"Exercise"} />
        {userExercise && (
          <Swiper
            spaceBetween={0.1}
            slidesPerView={3}
            freeMode={false}
            observer={true}
            className='eBox'
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            {userExercise.map((x, index) => {
              // console.log(x);
              return (
                <SwiperSlide key={index} className='boxSlide'>
                  <button
                    onClick={() => {
                      setState(x);
                      // console.log(x);
                    }}
                    className={
                      "exerciseButton " +
                      (state === x ? "exerciseButton_active" : "")
                    }
                  >
                    <label className='textExercise'>{x.name}</label>
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

        <div className='table'>
          <table className='customers'>
            <tr>
              <th>ระยะเวลา</th>
              <th>ปริมาณแคลอรี่</th>
            </tr>
            <tr>
              <td>30 นาที</td>
              <td>{state.cal_p_h * 0.5} แคลอรี่</td>
            </tr>
            <tr>
              <td>60 นาที</td>
              <td>{state.cal_p_h} แคลอรี่</td>
            </tr>
            <tr>
              <td>90 นาที</td>
              <td>{state.cal_p_h * 1.5} แคลอรี่</td>
            </tr>
            <tr>
              <td>120 นาที</td>
              <td>{state.cal_p_h * 2} แคลอรี่</td>
            </tr>
          </table>
        </div>
        <div className='caloryCal'>
          <div className='cBox1'>
            <label className='timeStart'>เวลาที่เริ่มออกกำลังกาย</label>

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
                    {hourList.map((a, ind) => {
                      return <MenuItem value={ind}>{a}</MenuItem>;
                    })}
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
                    {minuteList.map((a, ind) => {
                      return <MenuItem value={ind}>{a}</MenuItem>;
                    })}
                  </Select>
                  <FormHelperText>นาที</FormHelperText>
                </FormControl>
              </div>
            </div>
          </div>
          <div className='cBox2'>
            <div className='devideBox'>
              <div className='c'>
                <div className='cTop'>
                  <label className='burnAll'>เผาผลาญทั้งหมด</label>
                  <label className='valBurn'>
                    {(
                      ((parseInt(timeExerciseHr, 10) * 60 +
                        parseInt(timeExerciseMn, 10)) *
                        state.cal_p_h) /
                      60
                    ).toFixed(2)}
                  </label>
                  <label className='cal1'>แคลอรี่</label>
                </div>
                <div className='cBottom'>
                  <label className='burnLeft'>ต้องเผาผลาญอีก</label>
                  <label className='valLeft'> ?? </label>
                  <label className='cal2'>แคลอรี่</label>
                </div>
              </div>
              <form onSubmit={handleSubmitEx}>
                <button type='submit' className='exercise_btn_enter'>
                  {loading ? (
                    <Loader
                      type='TailSpin'
                      color='#fff'
                      height={35}
                      width={35}
                    />
                  ) : (
                    "บันทึก"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <MainFooterBox />
    </div>
  );
}

export default ExerciseMain;
