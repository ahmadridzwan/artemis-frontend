import classNames from "classnames";
const TextareaControl = ({
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
        <textarea
          id={id || name}
          placeholder={placeholder || ""}
          {...rest}
          ref={register}
        ></textarea>
        <label for={id || name}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      </div>
      {error && <div className="error-message">{error}</div>}
    </>
  );
};
export default TextareaControl;
