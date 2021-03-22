import react, { useState, useEffect, useRef, useDebugValue } from "react";
import { Link, Redirect } from "react-router-dom";
import apiClient from "../middleware/ApiClient";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert"; // Import
import calendarIcon from "../images/calendar.png";
import friendsIcon from "../images/chat.png";
import cupIcon from "../images/cup.png";
import excerciseIcon from "../images/excercise.png";
import GetImage from "../middleware/GetImage";
import Input from "../components/Input";
import "../styles/profile.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-confirm-alert/src/react-confirm-alert.css";

export function ShowProfile(props) {
  const username = props.match.params.username || "me";

  const [userData, setUserData] = useState({
    username: null,
    displayname: "hello world",
    weight: 0,
    bmi: 0,
    height: 0,
    bmr: 0,
    imgpath: null,
  });

  useEffect(async () => {
    const res = await getUserProfile(username);
    if (res) {
      const img = await GetImage(res.urlprofile);
      const age = getYears(res.birthday);

      // BMR Calculator
      let BMR = 0;
      if (res.gender === "G") {
        BMR = 65 + 9.6 * res.weight + 1.8 * res.height - 4.7 * age;
      } else if (res.gender === "B") {
        BMR = 66 + 13.7 * res.weight + 5 * res.height - 6.8 * age;
      }

      // BMI Calculator
      let BMI = (
        res.weight /
        ((res.height / 100) * (res.height / 100))
      ).toFixed(1);

      setUserData({
        ...userData,
        username: res.username,
        displayname: res.displayname,
        imgpath: img,
        height: res.height,
        weight: res.weight,
        birthday: moment(res.birthday).format("YYYY-MM-DD"),
        bmi: BMI,
        bmr: BMR,
      });
    }
  }, []);

  return (
    <div className='profile_container noselect c1'>
      <div className='profile_navigation_container'>
        <Link className='btn_back_ward' to={"/main"}>
          <i className='fa fa-chevron-circle-left' aria-hidden='true'></i>
          <p style={{ paddingLeft: "5px" }}>หน้าหลัก</p>
        </Link>
      </div>
      <div className='profile_container'>
        <ProfileHeader userData={userData} />
        <div className='profile_body_container'>
          <Shortcut_Box />
        </div>
      </div>
    </div>
  );
}

const ProfileHeader = ({ userData }) => {
  return (
    <div className='profile_header_container'>
      <div className='profile_header_sec1'>
        <div className='profile_sec1_1'>
          <div className='profile_weight_val'>{userData.weight}</div>
          <div className='profile_weight_title'>น้ำหนัก</div>
        </div>
        <div className='profile_sec1_2'>
          <div className='profile_weight_val'>{userData.bmi}</div>
          <div className='profile_weight_title'>BMI</div>
        </div>
      </div>
      <div className='profile_header_sec2'>
        <img
          className='profile_picture'
          src={userData.imgpath}
          style={{
            height: "200px",
            weight: "200px",
            minHeight: "200px",
            minWidth: "200px",
            maxHeight: "200px",
            maxWidth: "200px",
          }}
        />
        <div style={{ fontSize: "16px" }}>{userData.displayname}</div>
      </div>
      <div className='profile_header_sec3'>
        <div className='profile_sec1_1'>
          <div className='profile_weight_val'>{userData.height}</div>
          <div className='profile_weight_title'>ส่วนสูง</div>
        </div>
        <div className='profile_sec1_2'>
          <div className='profile_weight_val'>{userData.bmr}</div>
          <div className='profile_weight_title'>BMR</div>
        </div>
      </div>
      <div className='profile_header_sec4'>
        <Link className='profile_edit_btn' to='/editprofile'>
          <i className='fa fa-pencil' aria-hidden='true' />
          <p style={{ paddingLeft: "5px" }}>Edit</p>
        </Link>
      </div>
    </div>
  );
};

const Shortcut_Box = () => {
  const items = [
    [cupIcon, "/cup/"],
    [calendarIcon, "/Calendar/"],
    [friendsIcon, "/friends/"],
    [excerciseIcon, "/excercises/"],
  ];
  return (
    <div className='shortcut_box_container'>
      {items.map((item, key) => {
        return (
          <Link className='shortcut_item' to={item[1]} key={key}>
            <img src={item[0]} width='60px' />
          </Link>
        );
      })}
    </div>
  );
};

function getYears(birthday) {
  const n = Date.now();
  const d = new Date(birthday);
  const delta = n - d;
  return Math.floor(delta / 1000 / 60 / 60 / 24 / 365);
}

export function EditProfile(props) {
  const username = props.match.params.username || "me";
  const inputFile = useRef(null);
  const [tempFile, setTempFile] = useState(null);
  const [userData, setUserData] = useState({
    username: null,
    displayname: "hello world",
    weight: 0,
    height: 0,
    imgpath: null,
    gender: null,
    job: null,
  });
  const [newUserData, setNewUserData] = useState(userData);
  const [errors, setErrors] = useState({});
  const [loading, setLodding] = useState(false);
  const [pass, setStatus] = useState(false);
  const backToProfile = useRef(null);

  useEffect(async () => {
    const res = await getUserProfile(username);
    if (res) {
      const img = await GetImage(res.urlprofile);

      setUserData({
        ...userData,
        username: res.username,
        displayname: res.displayname,
        imgpath: img,
        height: res.height,
        weight: res.weight,
        birthday: moment(res.birthday).format("YYYY-MM-DD"),
        job: res.job,
        gender: res.gender,
      });
    }
  }, []);

  useEffect(() => {
    setNewUserData({ ...userData });
  }, [userData]);

  const handleFileUpload = (event) => {
    // console.log(event.target.files[0]);
    setNewUserData({
      ...newUserData,
      imgpath: URL.createObjectURL(event.target.files[0]),
    });

    setTempFile(event.target.files[0]);
  };

  const handleOnchange = (e) => {
    if (e.target) {
      setErrors({ ...errors, [e.target.id]: e.target.error });
      // console.log(e.target.value, e.target.id);
      setNewUserData({ ...newUserData, [e.target.id]: e.target.value });
    } else {
      // console.log(e);
      setNewUserData({ ...newUserData, birthday: e });
    }
  };

  const canSubmit = () => {
    // Error check
    let haveError = false;
    for (const x in errors) {
      if (errors[x]) {
        haveError = true;
        return false;
      }
    }
    return true;
  };

  const isModified = () => {
    return JSON.stringify(userData) !== JSON.stringify(newUserData);
  };

  const handleSave = async (e) => {
    if (canSubmit() && (isModified() || tempFile) && !loading) {
      setLodding(true);
      let bodyFormData = new FormData();
      bodyFormData.append("file", tempFile); //append the values with key, value pair
      bodyFormData.append("displayname", newUserData.displayname);
      bodyFormData.append("job", newUserData.job);
      bodyFormData.append("weight", newUserData.weight);
      bodyFormData.append("height", newUserData.height);
      bodyFormData.append("gender", newUserData.gender);
      bodyFormData.append("birthday", newUserData.birthday);
      var config = {
        method: "put",
        url: "/users/profile",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: bodyFormData,
      };
      const res = await apiClient(config);
      if (res.data.status === "success") {
        // console.log('yoo');
        setLodding(false);
        setStatus(true);
        setTimeout(() => {
          setStatus(false);
          // console.log('reset');
        }, 1000);
      } else {
        setLodding(false);
      }
    } else {
      console.log("จะอัพเดทอะไรยังไม่ได้แก้ไขอะไรเลยโว้ยย");
    }
  };

  const alertBox = () => {
    confirmAlert({
      title: "Confirm to cancle",
      message: "ระบบยังไม่ได้บันทึกข้อมูล ต้องการย้อนกลับใช่หรือไม่",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            // backToProfile.current.click();
            window.location.reload();
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className='edit_profile_container'>
      <div className='profile_navigation_container'>
        <Link ref={backToProfile} className='btn_back_ward' to={"/profile/me"}>
          <i className='fa fa-chevron-circle-left' aria-hidden='true'></i>
          <p style={{ paddingLeft: "5px" }}>โปรไฟล์</p>
        </Link>
      </div>
      <div className='edit_profile_header'>
        <img
          style={{
            height: "130px",
            weight: "130px",
            minHeight: "130px",
            minWidth: "130px",
            maxHeight: "130px",
            maxWidth: "130px",
          }}
          className='profile_picture'
          src={newUserData.imgpath}
        />
        <div className='edit_profile_header_btn'>
          <div className='edit_profile_header_box'>{newUserData.username}</div>
          <div
            className='upload_profile_btn'
            onClick={() => {
              inputFile.current.click();
            }}
          >
            Change profile picture
          </div>
          <input
            ref={inputFile}
            onChange={handleFileUpload}
            type='file'
            style={{ display: "none" }}
            accept='.jpg, .jpeg, .png'
          />
        </div>
      </div>
      <div className='edit_profile_body'>
        <Input
          value={newUserData.displayname}
          onChange={handleOnchange}
          id='displayname'
          allow='plain'
          maxLength={20}
        >
          ชื่อที่ใช้แสดง
        </Input>
        <Input
          value={newUserData.weight}
          onChange={handleOnchange}
          id='weight'
          type='number'
          ext='kg.'
          allow='number'
          min={30}
          max={200}
        >
          น้ำหนัก
        </Input>
        <Input
          value={newUserData.height}
          onChange={handleOnchange}
          id='height'
          type='number'
          ext='cm.'
          allow='number'
          min={120}
          max={200}
        >
          ส่วนสูง
        </Input>
        <Input
          value={newUserData.birthday}
          onChange={handleOnchange}
          id='birthday'
          type='date'
        >
          วันเดือนปีเกิด
        </Input>
        <Input
          value={newUserData.gender}
          onChange={handleOnchange}
          id='gender'
          type='combobox'
          options={["G", "B"]}
        >
          เพศ
        </Input>
        <Input
          value={newUserData.job}
          onChange={handleOnchange}
          id='job'
          type='combobox'
          options={["Programmer", "Student"]}
        >
          อาชีพ
        </Input>
      </div>
      <div className='edit_profile_footer'>
        <button className='edit_profile_btn' onClick={handleSave}>
          {loading ? (
            <Loader type='TailSpin' color='#fff' height={35} width={35} />
          ) : pass ? (
            <i className='fa fa-check' aria-hidden='true'></i>
          ) : (
            "บันทึก"
          )}
        </button>
        <button className='edit_profile_btn' onClick={alertBox}>
          ยกเลิก
        </button>
      </div>
    </div>
  );
}

const getUserProfile = async (username) => {
  const config = {
    method: "get",
    url: `/users/profile?username=${username}`,
  };
  try {
    const res = await apiClient(config);
    if (res.data.status == "success") return res.data.message;
    else return null;
  } catch (error) {
    console.log(error);
    // alert(error);
    return null;
  }
};
