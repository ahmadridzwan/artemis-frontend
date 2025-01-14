import Select from "react-select";
import classNames from "helper/classNames";
import { selectStyles } from "helper/common";

const SelectBox = ({ label, id, name, error = "", required, ...rest }) => {
  return (
    <>
      <div
        className={classNames({
          "as-select-box": true,
          "with-error": error,
        })}
      >
        <Select
          {...rest}
          styles={{
            ...selectStyles,
          }}
        />
        <label htmlFor={id}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      </div>
      {error && (
        <div className="error-message">
          {error} {required && <span className="text-danger">*</span>}
        </div>
      )}
    </>
  );
};

export default SelectBox;
