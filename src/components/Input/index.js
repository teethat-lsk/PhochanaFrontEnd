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
}) {
  const options_ = options || [];
  const [openDatePicker, toggleDatePicker] = useState(false);
  const [error, setError] = useState();

  const onChangeHandleCalendar = (e) => {
    onChange(moment(e).format("YYYY-MM-DD"));
    toggleDatePicker(false);
  };

  // Validator
  const handleValidation = (e) => {
    let valid = true;
    let value_ = e.target.value;

    if (
      value_.length < minLength &&
      allow != "password" &&
      allow !== "username"
    ) {
      valid = false;
      setError(`ความยาวต้องมากกว่า ${minLength} ตัวอักษร`);
    } else if (
      value_.length > maxLength &&
      allow !== "password" &&
      allow !== "username"
    ) {
      setError(`ความยาวห้ามเกิน ${maxLength} ตัวอักษร`);
      valid = false;
    } else if (
      (value_.length < minLength || value_.length > maxLength) &&
      allow === "password"
    ) {
      setError(
        `รหัสผ่านต้องมีความยาวมากกว่า ${minLength} ตัวอักษร และไม่เกิน ${maxLength} ตัวอักษร`
      );
      valid = false;
    } else if (
      (value_.length < minLength || value_.length > maxLength) &&
      allow === "username"
    ) {
      setError(
        `ชื่อผู้ใช้ต้องมีความยาวมากกว่า ${minLength} ตัวอักษร และไม่เกิน ${maxLength} ตัวอักษร`
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
        setError(`อนุญาติ a-z, 0-9, _ เท่านั้น`);
        // console.log('no');
        valid = false;
      } else if (!/[a-z]/g.test(value_)) {
        setError(`ต้องมีตัวอักษรภาษาอังกฤษตัวพิมพ์อย่างน้อย 1 ตัว`);
        // console.log('no');
        valid = false;
      } else if (value_.includes(" ") === true) {
        valid = false;
        setError("ชื่อผู้ใช้เว้นว่างไม่ได้");
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
      if (value_.includes(" ") === true) {
        valid = false;
        setError("รหัสผ่านเว้นว่างไม่ได้");
      } else if (!/^[a-z0-9_]+$/.test(value_)) {
        valid = false;
        setError(
          `รหัสผ่านต้องมีตัวอักษรพิมพ์เล็ก, พิมพ์ใหญ่ ตัวเลข และสัญลักษณ์อย่างน้อย 1 ตัว`
        );
      } else if (!/[a-z]/g.test(value_) || !/[A-Z]/g.test(value_)) {
        setError(
          `รหัสผ่านต้องมีตัวอักษรพิมพ์เล็ก, พิมพ์ใหญ่ ตัวเลข และสัญลักษณ์อย่างน้อย 1 ตัว`
        );
        // console.log('no');
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
