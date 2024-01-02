import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

function hexToRgb(hex) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // If the string is a shorthand (3 characters), expand it.
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Convert to numeric values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return as a string in the format "rgb(r, g, b)"
  return `${r}, ${g}, ${b}`;
}

const Spotlight = ({
  spotlightInfo,
  setIdx,
  total,
  idx,
  setIsSpotlight,
  setSlColor,
  renderCard,
}) => {
  const { content, media, design, actionButton } = spotlightInfo;

  const rgbColor = hexToRgb(design.bgColor);
  console.log("rgbColor", rgbColor);
  setSlColor(`rgba(${rgbColor},${design.bgOpacity / 100})`);

  // Text Styles
  const headingStyle = {
    color: content.headingTextColor,
    fontSize: content.headingFontSize / 2,
    fontWeight: content.headingFontWeight.toString(),
    textAlign: content.headingAlignment,
    margin: content.headingMargin.top,
  };

  const bodyStyle = {
    color: content.bodyTextColor,
    fontSize: content.bodyFontSize / 2,
    fontWeight: content.bodyFontWeight.toString(),
    textAlign: content.bodyAlignment,
    margin: content.bodyMargin.top,
  };

  // Button Style
  const buttonStyle = {
    backgroundColor: actionButton.buttonColor,
    borderRadius: actionButton.roundness,
    padding: actionButton.padding.top, // Assuming uniform padding
    margin: actionButton.margin.top, // Assuming uniform margin
  };

  const buttonText = actionButton.buttonText;

  const containerStyle = {
    justifyContent: "center",
    alignItems: "center",
    left: content.x_coordinate,
    top: content.y_coordinate - 350,
    zIndex: 1000,
  };

  const selectedContainer = {
    position: "absolute",
    borderWidth: 1,
    width: 130,
    height: 190,
    backgroundColor: "white",
  };

  return (
    <>
      <View style={selectedContainer}>{renderCard()}</View>
      <View style={containerStyle}>
        <Text style={headingStyle}>{content.heading}</Text>
        <Text style={bodyStyle}>{content.body}</Text>
        <TouchableOpacity
          style={buttonStyle}
          onPress={() => {
            if (idx + 1 < total) {
              setIdx((prevIdx) => prevIdx + 1);
              setIsSpotlight(false);
            }
          }}
        >
          <Text
            style={{
              color: actionButton.buttonTextColor,
              fontSize: actionButton.buttonFontSize / 2,
            }}
          >
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Spotlight;
