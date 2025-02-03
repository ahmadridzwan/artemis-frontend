import { useState, useContext } from "react";
import { createBlock } from "@/app/services/api";
import { AuthContext } from "@/app/context/AuthContext";
import { UserBlocksContext } from "@/app/context/UserBlockContext";
import styles from "./styles.module.scss";

const AdminBlockManager = () => {
  const { token } = useContext(AuthContext);
  const { predefinedBlocks,  loading } = useContext(UserBlocksContext);
  const [blockName, setBlockName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("single");
  const [iconFile, setIconFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setIconFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!blockName || !description || !type || !iconFile) {
      setError("All fields, including an icon, are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", blockName);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("icon", iconFile);

    const response = await createBlock(formData, token);

    if (response?.error) {
      setError(response.error);
    } else {
      setSuccess("Predefined block added successfully!");
      setBlockName("");
      setDescription("");
      setType("single");
      setIconFile(null);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Manage Predefined Blocks</h2>

      <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <input
          type="text"
          placeholder="Block Name"
          value={blockName}
          onChange={(e) => setBlockName(e.target.value)}
          required
          className={styles.input}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className={styles.input}
        />
        <select value={type} onChange={(e) => setType(e.target.value)} required className={styles.input}>
          <option value="single">Single</option>
          <option value="grouped">Grouped</option>
        </select>

        <input type="file" accept="image/*" onChange={handleFileChange} className={styles.fileInput} />

        <button type="submit" className={styles.submitButton}>Add Block</button>
      </form>

      <h3 className={styles.listTitle}>Existing Predefined Blocks</h3>
      {loading ? <p>Loading...</p> : (
        <ul className={styles.blockList}>
          {predefinedBlocks.map(block => (
            <li key={block._id} className={styles.blockItem}>
              <img src={block.icon} alt={block.name} className={styles.blockImage} />
              <p>{block.name} ({block.type})</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminBlockManager;
