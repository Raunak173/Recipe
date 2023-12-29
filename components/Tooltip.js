import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Tooltip = ({ tooltipInfo }) => {
  console.log("<<<<", tooltipInfo);
  // Extracting relevant data
  const { content, design, actionButton } = tooltipInfo;
  const { body, heading, x_coordinate, y_coordinate } = content;
  const { bgColor, borderColor, borderWidth, roundness } = design;

  // Styles based on the data
  const tooltipStyles = StyleSheet.create({
    container: {
      position: "absolute",
      left: x_coordinate - 90,
      top: y_coordinate,
      backgroundColor: bgColor,
      borderColor: borderColor,
      borderRadius: roundness,
      padding: 10,
      zIndex: 10,
      alignItems: "center",
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
      width: actionButton.buttonWidth === "fullWidth" ? "100%" : undefined,
    },
    buttonText: {
      color: actionButton.buttonTextColor,
      fontSize: actionButton.buttonFontSize / 2,
      fontWeight: `${actionButton.buttonFontWeight}`,
    },
    triangleTip: {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderLeftWidth: 10,
      borderRightWidth: 10,
      borderTopWidth: 20,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: bgColor,
      alignSelf: "center",
      position: "absolute",
      left: x_coordinate,
      top: y_coordinate * 2 + 10,
      zIndex: 10,
    },
  });

  return (
    <>
      <View style={tooltipStyles.container}>
        <Text style={tooltipStyles.heading}>
          {tooltipInfo?.content?.heading}
        </Text>
        <Text style={tooltipStyles.body}>{tooltipInfo?.content?.body}</Text>
        {actionButton.hasAdvancedOptions && (
          <TouchableOpacity style={tooltipStyles.button}>
            <Text style={tooltipStyles.buttonText}>
              {actionButton.buttonText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={tooltipStyles.triangleTip}></View>
    </>
  );
};

export default Tooltip;
