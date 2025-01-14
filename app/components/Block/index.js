import styles from "./styles.module.scss";
const Block = ({
  title,
  description,
  icon,
  onClick,
  disabled = false,
  type = "single",
  onCheck = (value) => {},
  selected = false,
}) => {
  //const [selected, setSelected] = useState(defaultSelected);

  const handleSelected = () => {
    //setSelected(!selected);
    onCheck(selected);
    onClick();
  };

  return (
    <button
      className={`${styles.block} ${selected ? styles.active : ""} ${
        disabled ? styles.disabled : ""
      }`}
      type="button"
      onClick={handleSelected}
    >
      {type == "groupped" && <div className={styles.grouppedCheckbox}>✓</div>}
      <div className={styles.blockIcon}>
        <img src={icon} alt={title} />
      </div>
      <div className={styles.blockContent}>
        <div className={styles.blockTitle}>{title}</div>
        <div className={styles.blockDescription}>{description}</div>
      </div>
    </button>
  );
};
export default Block;
