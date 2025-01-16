import { useContext, useState } from "react";
import { UserBlocksContext } from "@/app/context/UserBlockContext";
import styles from "./styles.module.scss";

const BlockSelector = () => {
  const { userBlocks, selectedType, selectBlocks, removeBlock, loading } = useContext(UserBlocksContext);
  const [selected, setSelected] = useState([]);

  if (loading) return <p>Loading blocks...</p>;

  const handleSelect = (blockId, type) => {
    if (selectedType && selectedType !== type) return;

    if (selected.includes(blockId)) {
      setSelected(selected.filter(id => id !== blockId));
    } else {
      setSelected([...selected, blockId]);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Select Blocks</h2>
      <div className={styles.blockList}>
        {userBlocks.map(block => (
          <div
            key={block._id}
            className={`${styles.blockItem} ${selected.includes(block._id) ? styles.selected : ""}`}
            onClick={() => handleSelect(block._id, block.type)}
          >
            {block.blockId.icon ? (
              <img src={block.blockId.icon} alt={block.name} className={styles.blockImage} />
            ) : (
              <p className={styles.noImageText}>No Image</p>
            )}
            <p className={styles.blockName}>{block.name}</p>
          </div>
        ))}
      </div>
      <button className={styles.submitButton} disabled={selected.length === 0} onClick={() => selectBlocks(selected)}>
        Submit Selection
      </button>
    </div>
  );
};

export default BlockSelector;
