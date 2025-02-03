const LabelList = ({ items = [] }) => {
  return (
    <div className="as-labels-list">
      {items.map((item, index) => (
        <div key={index} className="as-labels-list-item">
          <div>{item}</div>
        </div>
      ))}
    </div>
  );
};

export default LabelList;
