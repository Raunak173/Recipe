import React from "react";

const LayoutDataContext = React.createContext({
  layoutData: [],
  addLayoutData: () => {},
});

export default LayoutDataContext;
