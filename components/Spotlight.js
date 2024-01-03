import React, { useEffect, useState } from "react";
import { Image } from "react-native";
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

  const [imageUri, setImageUri] = useState("");

  useEffect(() => {
    // Fetch image using the provided API and image ID
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://dev.dashboard.api.nudgenow.com/images/${design?.arrowImageId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ3YWRlMDU2ZGRlYmY1MWY5NjY1NGEiLCJjbGllbnRJZCI6IjY0ZDdhZGUwNTZkZGViZjUxZjk2NjU0YSIsInJvbGUiOiJvd25lciIsImlhdCI6MTcwNDI3MTUyMywiZXhwIjoxNzA2ODYzNTIzfQ.QhDpt0_Zp1VoeOZJ4_FZAXpUaoHQLDYJoacdtOnTwKQ",
            },
          }
        );
        const data = await response.json();
        setImageUri(data?.data?.imageUrl);
        console.log("Image", data?.data?.imageUrl);
      } catch (error) {
        console.error("Error fetching image", error);
      }
    };

    fetchImage();
  }, [media.imageId]);

  const rgbColor = hexToRgb(design.bgColor);
  console.log("rgbColor", rgbColor);
  setSlColor(`rgba(${rgbColor},${design.bgOpacity / 100})`);
  // setSlColor(`rgba(${rgbColor},0.30)`);

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
    padding: actionButton.padding.top,
    margin: actionButton.margin.top,
  };

  const buttonText = actionButton.buttonText;

  const containerStyle = {
    justifyContent: "center",
    alignItems: "center",
    left: content.x_coordinate + 45,
    top: content.y_coordinate - 320,
    zIndex: 9999,
    position: "absolute",
  };

  const selectedContainer = {
    position: "relative",
    width: 130,
    height: 190,
    backgroundColor: "white",
    zIndex: 9999,
  };

  const imageStyle = {
    left: design.spotlightX + 90,
    top: design.spotlightY - 220,
    height: 80,
    width: 20,
    position: "absolute",
    zIndex: 10,
  };

  const handlePress = () => {
    if (idx + 1 < total) {
      setIdx((prevIdx) => prevIdx + 1);
      setIsSpotlight(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(handlePress, 3000);
    return () => clearTimeout(timeout);
  }, [idx]);

  return (
    <>
      <View style={selectedContainer}>{renderCard()}</View>
      <Image source={{ uri: imageUri }} style={imageStyle} />
      <View style={containerStyle}>
        <Text style={headingStyle}>{content.heading}</Text>
        <Text style={bodyStyle}>{content.body}</Text>
        <TouchableOpacity style={buttonStyle} onPress={handlePress}>
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
