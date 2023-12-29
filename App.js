import React, { useContext, useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import withCoordinates from "./withCoordinates";
import IndCard from "./components/IndCard";
import Categories from "./screens/Categories";
import CatPage from "./screens/CatPage";
import Home from "./screens/Home";
import Ingred from "./screens/Ingred";
import "./monkeyPatch";
import { Linking, Button, StyleSheet, Image } from "react-native";
import LayoutDataProvider from "./LayoutDataProvider";
import LayoutDataContext from "./LayoutDataContext";
import axios from "axios";

const Stack = createNativeStackNavigator();

export default function App() {
  const HomeWithCoordinates = withCoordinates(Home);
  const CategoriesWithCoordinates = withCoordinates(Categories);
  const IndCardWithCoordinates = withCoordinates(IndCard);
  const IngredWithCoordinates = withCoordinates(Ingred);
  const CatPageWithCoordinates = withCoordinates(CatPage);

  const viewShotRef = useRef();
  const [openedViaDeepLink, setOpenedViaDeepLink] = useState(true);

  const { layoutData, addLayoutData } = useContext(LayoutDataContext);

  const [lData, setLData] = useState(null);

  useEffect(() => {
    // Deep link handling
    const handleDeepLink = (event) => {
      console.log("Deep Link URL:", event.url);
      setOpenedViaDeepLink(true);
    };
    Linking.addEventListener(
      "https://nudge-mobile-connect.web.app/?socketId=64d7ade056ddebf51f96654a&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ3YWRlMDU2ZGRlYmY1MWY5NjY1NGEiLCJjbGllbnRJZCI6IjY0ZDdhZGUwNTZkZGViZjUxZjk2NjU0YSIsInJvbGUiOiJvd25lciIsImlhdCI6MTcwMTY1NjIyOSwiZXhwIjoxNzA0MjQ4MjI5fQ.ZOrCH6EYIeom2WdsohWgD1vTm5g0eMINny1aVbUHsMk&prefixKey=nudge-64d7ade056ddebf51f96654a",
      handleDeepLink
    );

    // Cleanup
    return () => {
      // Linking.removeEventListener("url", handleDeepLink);
    };
  }, []);

  let widthX, heightY;
  const getImageSize = (uri) => {
    Image.getSize(
      uri,
      (width, height) => {
        console.log(`Width: ${width}, Height: ${height}`);
        widthX = width;
        heightY = height;
        // You can also perform other actions with width and height here
      },
      (error) => {
        console.error(`Could not get image size: ${error}`);
      }
    );
  };

  const captureLayout = async () => {
    try {
      // Capture the screenshot
      const screenshotUri = await viewShotRef.current.capture();

      console.log("uri", screenshotUri);

      getImageSize(screenshotUri);

      // Prepare form data
      const formData = new FormData();
      formData.append("screenshot", {
        uri: screenshotUri,
        type: "image/png",
        name: "screenshot.png",
      });
      formData.append(
        "properties",
        JSON.stringify({ screenSize: `720x1415` })
        // JSON.stringify({ screenSize: `720x1648` })
      );
      formData.append("socketId", "64d7ade056ddebf51f96654a");
      formData.append("name", "Raunak Recipe Tooltip");
      formData.append("pageId", Date.now());
      formData.append("appVersion", "1.0.1");
      formData.append("tag", "1");
      // formData.append("properties", null);
      console.log("components", JSON.stringify(lData));
      formData.append("components", JSON.stringify(lData));
      // formData.append("components", []);

      // Send POST request
      const response = await axios.post(
        "https://stag-pointsystem.nudgenow.com/api/v1/pages/pg/upload/screenshot",
        formData,
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ3YWRlMDU2ZGRlYmY1MWY5NjY1NGEiLCJjbGllbnRJZCI6IjY0ZDdhZGUwNTZkZGViZjUxZjk2NjU0YSIsInJvbGUiOiJvd25lciIsImlhdCI6MTcwMTY4OTY4MywiZXhwIjoxNzA0MjgxNjgzfQ.Fu2JdSR1yUICzV_pyr03fQa_8W5_OzDXtEmQLfxCwA8",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error in captureLayout:", error);
    }
  };

  return (
    <LayoutDataProvider>
      <NavigationContainer>
        {openedViaDeepLink && (
          <Button
            title="Capture Layout"
            onPress={captureLayout}
            style={styles.captureButton}
          />
        )}
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            children={() => (
              <HomeWithCoordinates
                viewShotRef={viewShotRef}
                setLData={setLData}
              />
            )}
          />
          <Stack.Screen
            name="Categories"
            options={{ headerShown: false }}
            children={() => (
              <CategoriesWithCoordinates viewShotRef={viewShotRef} />
            )}
          />
          <Stack.Screen
            name="IndCard"
            options={{ headerShown: false }}
            children={() => (
              <IndCardWithCoordinates viewShotRef={viewShotRef} />
            )}
          />
          <Stack.Screen
            name="Ing"
            options={{ headerShown: false }}
            children={() => <IngredWithCoordinates viewShotRef={viewShotRef} />}
          />
          <Stack.Screen
            name="CatPage"
            options={{ headerShown: false }}
            children={() => (
              <CatPageWithCoordinates viewShotRef={viewShotRef} />
            )}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LayoutDataProvider>
  );
}

const styles = StyleSheet.create({
  captureButton: {
    position: "absolute",
    top: 0,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    right: 20,
    zIndex: 1,
    width: 100,
  },
});
