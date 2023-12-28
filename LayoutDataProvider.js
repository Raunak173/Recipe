import React, { useState } from "react";
import LayoutDataContext from "./LayoutDataContext";

const LayoutDataProvider = ({ children }) => {
  const [layoutData, setLayoutData] = useState([]);

  const addLayoutData = (newData) => {
    setLayoutData((currentData) => [...currentData, newData]);
  };

  return (
    <LayoutDataContext.Provider value={{ layoutData, addLayoutData }}>
      {children}
    </LayoutDataContext.Provider>
  );
};

export default LayoutDataProvider;
