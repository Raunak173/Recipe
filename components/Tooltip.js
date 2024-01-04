import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Tooltip = ({ tooltipInfo, setIdx, total, idx }) => {
  console.log("<<<<", tooltipInfo);
  // Extracting relevant data
  const { content, design, actionButton } = tooltipInfo;
  const { body, heading, x_coordinate, y_coordinate } = content;
  const { bgColor, borderColor, borderWidth, roundness } = design;

  // Styles based on the data
  const tooltipStyles = StyleSheet.create({
    topContainer: {
      position: "absolute",
      left: x_coordinate - 90,
      top: y_coordinate,
      backgroundColor: bgColor,
      borderColor: borderColor,
      borderRadius: roundness,
      padding: 10,
      alignItems: "center",
      zIndex: 1000,
    },
    leftContainer: {
      position: "absolute",
      left: x_coordinate + 30,
      top: y_coordinate + 30,
      backgroundColor: bgColor,
      borderColor: borderColor,
      borderRadius: roundness,
      padding: 10,
      zIndex: 10,
      alignItems: "center",
      zIndex: 1000,
    },
    bottomContainer: {
      position: "absolute",
      left: x_coordinate - 90,
      top: y_coordinate + 90,
      backgroundColor: bgColor,
      borderColor: borderColor,
      borderRadius: roundness,
      padding: 10,
      zIndex: 10,
      alignItems: "center",
      zIndex: 1000,
    },
    rightContainer: {
      position: "absolute",
      left: x_coordinate - 180,
      top: y_coordinate + 30,
      backgroundColor: bgColor,
      borderColor: borderColor,
      borderRadius: roundness,
      padding: 10,
      zIndex: 10,
      alignItems: "center",
      zIndex: 1000,
    },
    heading: {
      fontSize: heading?.headingFontSize,
      fontWeight: `${heading?.headingFontWeight}`,
      color: heading?.headingTextColor,
      textAlign: heading?.headingAlignment,
    },
    body: {
      fontSize: body?.bodyFontSize,
      fontWeight: `${body?.bodyFontWeight}`,
      color: body?.bodyTextColor,
      textAlign: body?.bodyAlignment,
    },
    button: {
      backgroundColor: actionButton.buttonColor,
      alignItems: actionButton.buttonAlignment,
      justifyContent: "center",
      borderRadius: actionButton.roundness,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginVertical: 10,
      width: actionButton.buttonWidth === "fullWidth" && "100%",
    },
    buttonContainer: {
      width: actionButton.buttonWidth === "fullWidth" && "100%",
      alignItems: actionButton.buttonAlignment,
    },
    buttonText: {
      color: actionButton.buttonTextColor,
      fontSize: actionButton.buttonFontSize / 2,
      fontWeight: `${actionButton.buttonFontWeight}`,
    },
    topTriangleTip: {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderLeftWidth: 20,
      borderRightWidth: 20,
      borderTopWidth: 20,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: bgColor,
      alignSelf: "center",
      position: "absolute",
      left:
        tooltipInfo?.design?.toolTipArrow === "center"
          ? x_coordinate
          : tooltipInfo?.design?.toolTipArrow === "left"
          ? x_coordinate - 30
          : x_coordinate + 30,
      top: y_coordinate * 2 + 10,
      zIndex: 10,
    },
    leftTriangleTip: {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderTopWidth: 20,
      borderBottomWidth: 20,
      borderRightWidth: 20,
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
      borderRightColor: bgColor,
      alignSelf: "center",
      position: "absolute",
      left: x_coordinate + 10,
      top: y_coordinate + 60,
      zIndex: 10,
    },
    bottomTriangleTip: {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderLeftWidth: 20,
      borderRightWidth: 20,
      borderBottomWidth: 20,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: bgColor,
      alignSelf: "center",
      position: "absolute",
      left:
        tooltipInfo?.design?.toolTipArrow === "center"
          ? x_coordinate
          : tooltipInfo?.design?.toolTipArrow === "left"
          ? x_coordinate - 30
          : x_coordinate + 30,
      top: 2 * y_coordinate - 30,
      zIndex: 10,
    },
    rightTriangleTip: {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderTopWidth: 20,
      borderBottomWidth: 20,
      borderLeftWidth: 20,
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
      borderLeftColor: bgColor,
      alignSelf: "center",
      position: "absolute",
      left: x_coordinate - 60,
      top: y_coordinate + 60,
      zIndex: 10,
    },
  });

  const getContainerStyle = () => {
    switch (tooltipInfo?.design?.toolTipPosition) {
      case "top":
        return tooltipStyles.topContainer;
      case "bottom":
        return tooltipStyles.bottomContainer;
      case "left":
        return tooltipStyles.rightContainer;
      case "right":
        return tooltipStyles.leftContainer;
      default:
        return tooltipStyles.topContainer;
    }
  };

  return (
    <>
      <View style={getContainerStyle()}>
        <Text style={tooltipStyles.heading}>
          {tooltipInfo?.content?.heading}
        </Text>
        <Text style={tooltipStyles.body}>{tooltipInfo?.content?.body}</Text>
        <View style={tooltipStyles.buttonContainer}>
          {actionButton.hasAdvancedOptions && (
            <TouchableOpacity
              style={tooltipStyles.button}
              onPress={() => {
                if (idx + 1 < total) {
                  setIdx((prevIdx) => prevIdx + 1);
                }
              }}
            >
              <Text style={tooltipStyles.buttonText}>
                {actionButton.buttonText}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {tooltipInfo?.design?.toolTipPosition === "top" && (
        <View style={tooltipStyles.topTriangleTip} />
      )}
      {tooltipInfo?.design?.toolTipPosition === "bottom" && (
        <View style={tooltipStyles.bottomTriangleTip} />
      )}
      {tooltipInfo?.design?.toolTipPosition === "left" && (
        <View style={tooltipStyles.rightTriangleTip} />
      )}
      {tooltipInfo?.design?.toolTipPosition === "right" && (
        <View style={tooltipStyles.leftTriangleTip} />
      )}
    </>
  );
};

export default Tooltip;
