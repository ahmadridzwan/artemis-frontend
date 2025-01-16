"use client";
import { useContext, useState, useEffect } from "react";
import { UserBlocksContext } from "@/app/context/UserBlockContext";
import { addUserBlocks, removeUserBlock } from "../../services/api";
import { AuthContext } from "@/app/context/AuthContext";
import styles from "./styles.module.scss";

const UserBlockManager = () => {
  const { userBlocks, predefinedBlocks, selectedType, fetchUserBlocks } = useContext(UserBlocksContext);
  const { token, logout } = useContext(AuthContext);
  const [selected, setSelected] = useState([]);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const [loadingBlockId, setLoadingBlockId] = useState(null); // ✅ Loading state for remove operation

  useEffect(() => {
  }, [userBlocks, predefinedBlocks]);

  const availableBlocks = predefinedBlocks.filter(
    (predefinedBlock) => !userBlocks.some(userBlock => userBlock.blockId._id === predefinedBlock._id)
  );

  const handleSelect = (block) => {
    if (selectedType === "single") return;

    if (selected.includes(block._id)) {
      setSelected(selected.filter((id) => id !== block._id));
    } else {
      setSelected([...selected, block._id]);
    }
  };

  const handleRemove = async (blockId) => {
    setLoadingBlockId(blockId); // ✅ Show loading spinner for this block
    await removeUserBlock(blockId, token);
    await fetchUserBlocks();
    setLoadingBlockId(null);
  };

  const handleSubmit = async () => {
    if (selected.length === 0) return;
    setLoading(true); // ✅ Show loading spinner when adding blocks
    await addUserBlocks(selected, token);
    setSelected([]);
    await fetchUserBlocks();
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>Manage Your Blocks</h1>

      <h2>Your Selected Blocks</h2>
      <div className={styles.upperGrid}>
        {userBlocks.length > 0 ? (
          userBlocks.map((block) => (
            <div key={block._id} className={styles.blockItem}>
              <img src={block.blockId.icon} alt={block.name} className={styles.blockImage} />
              <p>{block.name}</p>
              <p>{block.blockId.type === "single" ? "Single" : "Grouped"}</p>
              <button
                className={styles.deleteButton}
                onClick={() => handleRemove(block._id)}
                disabled={loadingBlockId === block._id} // ✅ Disable while removing
              >
                {loadingBlockId === block._id ? "Removing..." : "Remove"}
              </button>
            </div>
          ))
        ) : (
          <p>No blocks selected yet.</p>
        )}
      </div>

      <h2>Available Blocks</h2>
      <div className={styles.lowerGrid}>
        {availableBlocks.length > 0 ? (
          availableBlocks.map((block) => {
            const isDisabled =
              (selectedType === "single") ||
              (selectedType === "grouped" && block.type === "single") ||
              (selected.length > 0 && selected.some(bId => predefinedBlocks.find(b => b._id === bId)?.type !== block.type));

            return (
              <div
                key={block._id}
                className={`${styles.blockItem} ${isDisabled ? styles.disabled : ""}`}
                onClick={!isDisabled ? () => handleSelect(block) : null}
                onMouseEnter={() => isDisabled && setTooltipMessage("Invalid selection")}
                onMouseLeave={() => setTooltipMessage("")}
              >
                <img src={block.icon} alt={block.name} className={styles.blockImage} />
                <p>{block.name}</p>
                <p>{block.type === "single" ? "Single" : "Grouped"}</p>
                {selected.includes(block._id) && <span className={styles.checkmark}>✔</span>}
              </div>
            );
          })
        ) : (
          <p>No available blocks left.</p>
        )}
      </div>

      {tooltipMessage && <div className={styles.tooltip}>{tooltipMessage}</div>}

      <button
        className={styles.submitButton}
        onClick={handleSubmit}
        disabled={selected.length === 0 || availableBlocks.length === 0 || loading}
      >
        {loading ? "Processing..." : "Add Selected Blocks"}
      </button>
    </div>
  );
};

export default UserBlockManager;
