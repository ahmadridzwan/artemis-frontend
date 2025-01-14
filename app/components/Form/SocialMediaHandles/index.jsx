import styles from "./style.module.scss";
import { useState, useEffect, useMemo, memo } from "react";
import Select from "react-select";
import { socialMediaSites, selectStylesSocialMedia } from "helper/common";

const CustomOption = ({ innerProps, getValue, data }) => {
  return (
    <div className={styles.smOption} {...innerProps}>
      <img src={`/images/social-media/${data.icon}.svg`} />
      <span>{data.label}</span>
    </div>
  );
};

const CustomSingleValue = ({ innerProps, getValue, data }) => {
  return (
    <div className={styles.smOptionSelected} {...innerProps}>
      <img src={`/images/social-media/${data.icon}.svg`} />
      <span>{data.label}</span>
    </div>
  );
};

const CustomValueContainer = ({ innerProps, getValue, data, children }) => {
  return (
    <div className={styles.smOptionSingleContainer} {...innerProps}>
      {children}
    </div>
  );
};

const Item = ({
  index,
  onChangeItem,
  value = { site: "", handle: "" },
  onDelete,
  disableDelete,
}) => {
  const [inputFields, setInputFields] = useState(value);
  const [selectedOption, setSelectedOption] = useState({});

  const handleEditItem = (field, value) => {
    const updateFields = { ...inputFields, [field]: value };
    setInputFields(updateFields);
    if (onChangeItem) onChangeItem(updateFields);
  };

  useEffect(() => {
    if (value.site) {
      const opt = socialMediaSites.find((option) => option.value == value.site);
      setSelectedOption(opt);
    }
  }, [value]);

  return (
    <div className={styles.smItem}>
      <div className={styles.smType}>
        <label htmlFor={`smType-${index}`}>Social Media </label>
        <Select
          styles={selectStylesSocialMedia}
          options={socialMediaSites}
          showIndicator={false}
          key={`item-${index}`}
          value={selectedOption}
          defaultValue={selectedOption}
          components={{
            IndicatorSeparator: () => null,
            Option: CustomOption,
            SingleValue: CustomSingleValue,
            ValueContainer: CustomValueContainer,
          }}
          onChange={(e) => handleEditItem("site", e.value)}
        />
      </div>
      <div className={styles.smSeparater}>/</div>
      <div className={styles.smLink}>
        <input
          type="text"
          placeholder="Enter your handle"
          defaultValue={value.handle}
          value={value.handle}
          onChange={(e) => handleEditItem("handle", e.target.value)}
        />
      </div>
      <button
        className={styles.smRemoveBtn}
        onClick={onDelete}
        disabled={disableDelete}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.2153 3.93223C15.5071 3.93223 15.75 4.17447 15.75 4.48272V4.76772C15.75 5.06846 15.5071 5.31821 15.2153 5.31821H2.78539C2.49289 5.31821 2.25 5.06846 2.25 4.76772V4.48272C2.25 4.17447 2.49289 3.93223 2.78539 3.93223H4.97217C5.41639 3.93223 5.80298 3.61648 5.90291 3.17098L6.01743 2.65949C6.1954 1.96275 6.78112 1.5 7.45145 1.5H10.5485C11.2116 1.5 11.8039 1.96275 11.9753 2.62274L12.0978 3.17023C12.197 3.61648 12.5836 3.93223 13.0286 3.93223H15.2153ZM14.1044 14.3505C14.3327 12.2228 14.7324 7.16784 14.7324 7.11684C14.747 6.96235 14.6967 6.8161 14.5967 6.69835C14.4895 6.5881 14.3538 6.52285 14.2043 6.52285H3.80139C3.65113 6.52285 3.50817 6.5881 3.40897 6.69835C3.30831 6.8161 3.25871 6.96235 3.266 7.11684C3.26734 7.12621 3.28168 7.30428 3.30566 7.60197C3.41219 8.92441 3.70888 12.6076 3.90059 14.3505C4.03626 15.6345 4.87874 16.4415 6.09905 16.4708C7.04072 16.4925 8.01084 16.5 9.00284 16.5C9.93722 16.5 10.8862 16.4925 11.857 16.4708C13.1197 16.449 13.9614 15.6563 14.1044 14.3505Z"
            fill="#F03921"
          />
        </svg>
      </button>
    </div>
  );
};

const SocialMediaHandles = ({
  initValue = [{ site: "facebook", handle: "" }],
  onChangeLinks,
  AddButtonTitle = "Add New Handle",
  error,
}) => {
  const [socialMediaHandles, setSocialMediaHandles] = useState(initValue);
  const [isAddNewDisabled, setIsAddNewDisabled] = useState(false);

  const addNewHandle = () => {
    const updatedList = [
      ...socialMediaHandles,
      { site: "facebook", handle: "" },
    ];
    setSocialMediaHandles(updatedList);
    if (onChangeLinks) onChangeLinks(updatedList);
  };

  const deleteHandle = (x) => {
    const updatedList = socialMediaHandles.filter((_, i) => i !== x);
    setSocialMediaHandles(updatedList);
    if (onChangeLinks) onChangeLinks(updatedList);
  };

  useEffect(() => {
    const emptyItems = socialMediaHandles.filter(
      (item) => item.handle === "" || item.site == ""
    );
    setIsAddNewDisabled(emptyItems.length > 0);
  }, [socialMediaHandles]);

  const handleEditItem = (index, value) => {
    const updatedList = socialMediaHandles.map((item, i) =>
      i === index ? value : item
    );
    setSocialMediaHandles(updatedList);
    if (onChangeLinks) onChangeLinks(updatedList);
  };

  useEffect(() => {
    setSocialMediaHandles(initValue);
  }, [initValue]);

  return (
    <div className={styles.socialMediaHandles}>
      <div className={styles.smItems}>
        {socialMediaHandles.map((site, index) => (
          <Item
            index={index}
            value={site}
            onChangeItem={(item) => handleEditItem(index, item)}
            key={index}
            onDelete={() => deleteHandle(index)}
            disableDelete={socialMediaHandles.length === 1}
          />
        ))}
      </div>
      {error && <p className="text-danger">{error}</p>}
      <div className={styles.smAddBtn}>
        <button
          className={styles.smAddBtn}
          onClick={addNewHandle}
          type="button"
          disabled={isAddNewDisabled}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.8334 9.16671H10.8334V4.16671C10.8334 3.70587 10.46 3.33337 10 3.33337C9.54004 3.33337 9.16671 3.70587 9.16671 4.16671V9.16671H4.16671C3.70671 9.16671 3.33337 9.53921 3.33337 10C3.33337 10.4609 3.70671 10.8334 4.16671 10.8334H9.16671V15.8334C9.16671 16.2942 9.54004 16.6667 10 16.6667C10.46 16.6667 10.8334 16.2942 10.8334 15.8334V10.8334H15.8334C16.2934 10.8334 16.6667 10.4609 16.6667 10C16.6667 9.53921 16.2934 9.16671 15.8334 9.16671Z"
              fill="#26246F"
            />
          </svg>
          <span>{AddButtonTitle}</span>
        </button>
      </div>
    </div>
  );
};
export default SocialMediaHandles;
