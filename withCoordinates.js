import React, { useContext } from "react";
import { View } from "react-native";
import LayoutDataContext from "./LayoutDataContext";

const withCoordinates = (WrappedComponent) => {
  return class extends React.Component {
    static contextType = LayoutDataContext;

    onLayout = (event) => {
      const { layoutData, addLayoutData } = this.context;
      const { x, y, width, height } = event.nativeEvent.layout;
      const componentName =
        WrappedComponent.displayName || WrappedComponent.name;

      // Add this component's layout data to the context
      addLayoutData({ component: componentName, x, y, width, height });
    };

    render() {
      return (
        <View onLayout={this.onLayout} style={{ flex: 1 }}>
          <WrappedComponent {...this.props} />
        </View>
      );
    }
  };
};

export default withCoordinates;
