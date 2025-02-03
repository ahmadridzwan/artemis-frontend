import { createContext, useState, useEffect, useContext } from "react";
import { getUserBlocks, getAllPredefinedBlocks } from "../services/api";
import { AuthContext } from "./AuthContext";

export const UserBlocksContext = createContext();

export const UserBlocksProvider = ({ children }) => {
  const { token, isAdmin } = useContext(AuthContext);
  const [userBlocks, setUserBlocks] = useState([]);
  const [predefinedBlocks, setPredefinedBlocks] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token, isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (isAdmin) {
        await fetchPredefinedBlocks();
      } else {
        await Promise.all([fetchUserBlocks(), fetchPredefinedBlocks()]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBlocks = async () => {
    try {
      const data = await getUserBlocks(token);
      setUserBlocks(data.blocks || []);
      setSelectedType(data.selectedType || null);
    } catch (error) {
      console.error("Error fetching user blocks:", error);
    }
  };

  const fetchPredefinedBlocks = async () => {
    try {
      const data = await getAllPredefinedBlocks(token);
      setPredefinedBlocks(data.blocks || []);
    } catch (error) {
      console.error("Error fetching predefined blocks:", error);
    }
  };

  return (
    <UserBlocksContext.Provider value={{ 
      userBlocks, 
      predefinedBlocks, 
      selectedType, 
      fetchUserBlocks, 
      fetchPredefinedBlocks, 
      loading 
    }}>
      {children}
    </UserBlocksContext.Provider>
  );
};
