import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import FormError from "components/errors/FormError";
import classNames from "classnames";

const PhonePicker = ({
  name,
  register,
  errors,
  isEdit,
  value,
  onChange = () => {},
  routerPath,
  country = "ae",
  isRequired = false,
  textColor,
  setValue,
  label = "Phone",
}) => {
  useEffect(() => {
    if (!setValue) return;
    setValue(value);
  }, [value]);

  const [selectedCountryCode, setSelectedCountryCode] = useState("+");
  let isValidPhoneNumber = false;
  const handlePhoneChange = (countryData) => {
    const countryCode = countryData?.dialCode;
    setSelectedCountryCode(countryCode);
    isValidPhoneNumber = value?.split(countryCode)?.[1];
  };
  const isPhoneValid = (value) => {
    return value?.length > 5;
  };

  return (
    <div
      className={classNames("as-phone-picker", {
        "is-invalid": errors?.[name],
      })}
    >
      <PhoneInput
        country={country.toLowerCase()}
        value={value || selectedCountryCode} // Set the value of the phone input
        onChange={(phone) => onChange({ target: { name, value: phone } })}
        inputProps={{
          name: name,
          disabled: isEdit,
          ref: isRequired
            ? register({
                required: "Number is required",
                validate: (value) => isPhoneValid(value) || "Invalid Number",
              })
            : register(),
        }}
        autoFormat={false}
        // isValid={(inputNumber, country, countries) => {
        //   handlePhoneChange(country);
        // }}
      />
      <label>
        {label} {isRequired && <span className="text-danger">*</span>}
      </label>
      {errors?.[name] && <FormError error={errors?.[name]?.message} />}
    </div>
  );
};

export default PhonePicker;
