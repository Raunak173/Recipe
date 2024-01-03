import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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

const Coachmark = ({ coachmarkInfo, renderCard, setIdx, total, idx }) => {
  const { content, media, design, actionButton } = coachmarkInfo;
  let rgbColor = hexToRgb(coachmarkInfo?.design?.coachColor);

  const handlePress = () => {
    if (idx + 1 < total) {
      setIdx((prevIdx) => prevIdx + 1);
    }
  };

  const headingStyle = {
    color: content.headingTextColor,
    fontSize: content.headingFontSize / 2,
    fontWeight: content.headingFontWeight.toString(),
    textAlign: content.headingAlignment,
    margin: content.headingMargin.top / 2,
  };

  const bodyStyle = {
    color: content.bodyTextColor,
    fontSize: content.bodyFontSize / 2,
    fontWeight: content.bodyFontWeight.toString(),
    textAlign: content.bodyAlignment,
    margin: content.bodyMargin.top / 2,
  };

  // Button Style
  const buttonStyle = {
    backgroundColor: actionButton.buttonColor,
    borderRadius: actionButton.roundness,
    padding: actionButton.padding.top,
    margin: actionButton.margin.top / 2,
  };

  const buttonText = actionButton.buttonText;

  return (
    <View style={[styles.coachmark]}>
      {renderCard()}
      {/* Three concentric circles */}
      <View
        style={[
          styles.circle,
          styles.circle1,
          {
            backgroundColor: `rgba(${rgbColor},0.50)`,
          },
        ]}
      ></View>
      <View
        style={[
          styles.circle,
          styles.circle2,
          {
            backgroundColor: `rgba(${rgbColor},0.25)`,
          },
        ]}
      ></View>
      <View
        style={[
          styles.circle,
          styles.circle3,
          {
            backgroundColor: `rgba(${rgbColor},0.16)`,
          },
        ]}
      ></View>

      <View
        style={{
          position: "absolute",
          left: coachmarkInfo?.content?.x_coordinate - 240,
          top: coachmarkInfo?.content?.y_coordinate + 210,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={headingStyle}>{coachmarkInfo?.content?.heading}</Text>
        <Text style={bodyStyle}>{coachmarkInfo?.content?.body}</Text>
        <TouchableOpacity style={buttonStyle} onPress={handlePress}>
          <Text
            style={{
              color: actionButton.buttonTextColor,
              fontSize: actionButton.buttonFontSize / 2,
            }}
          >
            {coachmarkInfo?.actionButton?.buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  coachmark: {
    padding: 10,
    borderRadius: 10,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
  },
  circle1: {
    width: 200,
    height: 200,
    borderRadius: 999,
    top: -10,
  },
  circle2: {
    width: 240,
    height: 240,
    borderRadius: 999,
    top: -30,
  },
  circle3: {
    width: 280,
    height: 280,
    borderRadius: 999,
    top: -50,
  },
});

export default Coachmark;
