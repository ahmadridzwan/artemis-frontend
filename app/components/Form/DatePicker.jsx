import classNames from "classnames";
import DatePickerControl from "react-multi-date-picker";
import { useState } from "react";
const DatePicker = ({
  label,
  required,
  placeholder = "",
  error,
  register,
  ...rest
}) => {
  const { id, name } = rest;

  return (
    <>
      <div
        className={classNames({
          "as-input-control": true,
          "with-error": error,
        })}
      >
        <DatePickerControl
          {...rest}
          id={id || name}
          placeholder={placeholder || ""}
        />
        <label htmlFor={id || name}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      </div>
      {error && <div className="error-message">{error}</div>}
    </>
  );
};
export default DatePicker;
