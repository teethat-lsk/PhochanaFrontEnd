import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import validator from "validator";
import "./Input.css";

function Input({
  children,
  ext,
  placeholder,
  type,
  options,
  value,
  onChange,
  id,
  minLength = 1,
  maxLength = 30,
  max = 100000000000,
  min = -100000000000,
  allow = "plain", // plain, email, username, number
  tError,
  emptyCheck,
}) {
  const options_ = options || [];
  const [openDatePicker, toggleDatePicker] = useState(false);
  const [error, setError] = useState();

  const onChangeHandleCalendar = (e) => {
    onChange(moment(e).format("YYYY-MM-DD"));
    toggleDatePicker(false);
  };

  useEffect(() => {
    if (tError) {
      console.log(value);
      if (value == undefined || value.length == 0) {
        setError(tError);
      }
    }
  }, [tError]);

  // Validator
  const handleValidation = (e) => {
    let valid = true;
    let value_ = e.target.value;
    // console.log(value_.length);
    if (emptyCheck && value_.length == "0") {
      // console.log('empty');
      setError("กรุณากรอกข้อมูลให้ครบ");
      onChange(e);
      return;
    }

    // console.log(
    // 	value_.length,
    // 	maxLength,
    // 	allow !== 'password',
    // 	allow !== 'username'
    // );

    if (
      value_.length < minLength
      //  &&
      // allow != 'password' &&
      // allow !== 'username'
    ) {
      valid = false;
      setError(`ความยาวต้องมากกว่า ${minLength - 1} ตัวอักษร`);
    } else if (
      value_.length > maxLength
      // &&
      // allow !== 'password' &&
      // allow !== 'username'
    ) {
      setError(`ความยาวห้ามเกิน ${maxLength} ตัวอักษร`);
      valid = false;
    } else if (value_.includes(" ") === true && allow === "password") {
      valid = false;
      setError("ชื่อผู้ใช้งานเว้นว่างไม่ได้");
    } else if (value_.includes(" ") === true && allow === "password") {
      valid = false;
      setError("รหัสผ่านเว้นว่างไม่ได้");
    } else if (value_.length < minLength && allow === "password") {
      setError(`รหัสผ่านต้องมีความยาวมากกว่า ${minLength - 1} ตัวอักษร`);
      valid = false;
    } else if (
      (value_.length < minLength || value_.length > maxLength) &&
      allow === "username"
    ) {
      setError(
        `ชื่อผู้ใช้ต้องมีความยาวมากกว่า ${
          minLength - 1
        } ตัวอักษร และไม่เกิน ${maxLength} ตัวอักษร`
      );
      valid = false;
    } else if (allow === "email") {
      // console.log(validator.isEmail(e.target.value), e.target.value);
      if (!validator.isEmail(value_)) {
        setError(`รูปแบบของ email ไม่ถูกต้อง`);
        valid = false;
      } else {
        valid = true;
      }
    } else if (allow === "username") {
      // console.log(!/^[a-z0-9_]+$/.test(value_), !/[a-z]/g.test(value_));
      if (!/^[a-z0-9_]+$/.test(value_)) {
        setError(`ชื่อผู้ใช้งาน อนุญาติให้ใช้ a-z, 0-9, _ เท่านั้น`);
        // console.log('no');
        valid = false;
      } else if (!/[a-z]/g.test(value_)) {
        setError(
          `ชื่อผู้ใช้งานต้องมีตัวอักษรภาษาอังกฤษตัวพิมพ์เล็กอย่างน้อย 1 ตัว`
        );
        // console.log('no');
        valid = false;
      } else if (value_.includes(" ") === true) {
        valid = false;
        setError("ชื่อผู้ใช้เว้นว่างไม่ได้");
      } else {
        // console.log('yes');
        valid = true;
      }
    } else if (allow === "displayName") {
      // console.log(!/^[a-z0-9_]+$/.test(value_), !/[a-z]/g.test(value_));
      if (!/^[a-z0-9_]+$/.test(value_)) {
        setError(`อนุญาติ a-z, 0-9, _ เท่านั้น`);
        // console.log('no');
        valid = false;
      } else if (!/[a-z]/g.test(value_)) {
        setError(`ต้องมีตัวอักษรภาษาอังกฤษตัวพิมพ์เล็กอย่างน้อย 1 ตัว`);
        // console.log('no');
        valid = false;
      } else if (value_.includes(" ") === true) {
        valid = false;
        setError("ชื่อที่ใช้แสดงเว้นว่างไม่ได้");
      } else {
        // console.log('yes');
        valid = true;
      }
    } else if (allow === "number") {
      if (value_ >= min && value_ <= max) {
        valid = true;
      } else {
        valid = false;
        setError(`กรุณาใส่ค่าในช่วง ${min} ถึง ${max}`);
      }
    } else if (allow === "password") {
      if (!checkSymbolPassword(value_) === true) {
        setError(
          `รหัสผ่านต้องมีตัวอักษรพิมพ์เล็ก, พิมพ์ใหญ่ ตัวเลข และสัญลักษณ์อย่างน้อย 1 ตัว`
        );
        valid = false;
      } else {
        valid = true;
      }
    }

    if (valid) {
      setError();
      e.target.error = false;
      // console.log('clear!');
    } else {
      e.target.error = true;
    }
    onChange(e);
  };

  const checkSymbolPassword = (v) => {
    var lower = false;
    var upper = false;
    var number = false;
    var symbol = false;
    for (var i = 0; i < v.length; i++) {
      if (v[i].match(/[a-z]/g)) {
        lower = true;
      } else if (v[i].match(/[A-Z]/g)) {
        upper = true;
      }
      // if (v[i].match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
      else if (v[i].match(/[0-9]/g)) {
        number = true;
      } else if (v[i].match(/[-!$%^&*()_+|~=`@{}\[\]:";'<>?,.\/]/)) {
        symbol = true;
      }
    }

    if (lower && upper && number && symbol) {
      return true;
    } else {
      // console.log('pass');
      return false;
    }
  };
  const onChangeHandleDropdown = (e) => {
    // console.log(e.target.value);
    onChange(e);
  };

  return (
    <div className='input_container'>
      <div className='input_title'>{children}</div>
      <div className='input_box'>
        {type !== "combobox" ? (
          <input
            id={id}
            className='input_input'
            placeholder={placeholder || ""}
            value={value}
            onChange={handleValidation}
            type={type || "input"}
            onClick={() => {
              type === "date" && toggleDatePicker(!openDatePicker);
            }}
            readonly={type === "date" ? "readonly" : false}
          />
        ) : (
          <select
            className='select_input'
            onChange={onChangeHandleDropdown}
            id={id}
            value={value}
          >
            {options_.map((value, key) => {
              return (
                <option key={key} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
        )}
        {type !== "combobox" && <div className='input_ext'>{ext}</div>}
      </div>
      {openDatePicker && (
        <Calendar
          className='input_calendar'
          maxDate={new Date()}
          locale='th'
          onChange={onChangeHandleCalendar}
          value={typeof value === "string" ? new Date(value) : value}
        />
      )}
      {error && <div className='input_error_box'>{error}</div>}
    </div>
  );
}

export default Input;
