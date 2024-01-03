import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import menu from "../assets/menu.png";
import close from "../assets/close.png";
import cross from "../assets/cross.png";
import { categories, recipes } from "../data";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import cat from "../assets/cat.png";
import home from "../assets/home.png";
import search from "../assets/search.png";
import ViewShot from "react-native-view-shot";
import LayoutDataContext from "../LayoutDataContext";
import NudgeMaker from "../components/NudgeMaker";

const Home = ({ viewShotRef, setLData, nudges }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [idx, setIdx] = useState(0);
  const [isSpotlight, setIsSpotlight] = useState(false);
  const [slColor, setSlColor] = useState("rgba(65,117,5,0.20)");
  const navigation = useNavigation();
  const elIdx = nudges[idx]?.location?.element;

  console.log("El Idx", elIdx);

  const [data, setData] = useState(recipes);
  const [query, setQuery] = useState("");
  const { width, height } = Dimensions.get("window");

  const onSubmitted = () => {
    setData(
      recipes.filter((rec) =>
        rec.title.toLowerCase().includes(query.toLowerCase())
      )
    );
    setQuery("");
  };

  //Will be added by clients to target elements
  const cardRefs = useRef([]); // Refs array
  const homeTextRef = useRef(null);

  // Context to store layout data
  const { addLayoutData } = useContext(LayoutDataContext);

  // Update refs array when data changes
  useEffect(() => {
    cardRefs.current = data.map(
      (_, i) => cardRefs.current[i] || React.createRef()
    );
  }, [data]);

  let idCounter = 0;

  const generateUniqueId = () => {
    const id = idCounter;
    idCounter += 1;
    return id;
  };

  const captureLayoutData = () => {
    const measureLayout = (ref) =>
      new Promise((resolve) => {
        if (ref) {
          ref.measure((x, y, width, height, pageX, pageY) => {
            const id = generateUniqueId();
            // Only process IDs from 1 to 6
            if (id >= 1 && id <= 6) {
              const level = Math.ceil(id / 2);
              const additionalY = 100 * (level - 1);
              const additionalHeight = 100 * (level - 1);
              resolve({
                x: pageX * 3.6,
                y: pageY * 2.83 + additionalY,
                width: width * 3.6,
                height: height * 2.83 + additionalHeight,
                componentId: id,
                name: `name${id}`,
                properties: null,
              });
            } else {
              resolve(null);
            }
          });
        } else {
          resolve(null);
        }
      });

    const promises = [
      measureLayout(homeTextRef.current),
      ...cardRefs.current.map((ref) => measureLayout(ref)),
    ];

    Promise.all(promises).then((layoutDataArray) => {
      const filteredLayoutData = layoutDataArray.filter(
        (data) => data !== null
      );
      addLayoutData(filteredLayoutData);
      setLData(filteredLayoutData);
      console.log("Layout data array:", filteredLayoutData);
    });
  };

  // useEffect(() => {
  //   onCaptureLayoutData(captureLayoutData);
  // }, []);

  return (
    <ViewShot
      ref={viewShotRef}
      options={{ format: "png", quality: 1 }}
      style={{ flex: 1 }}
    >
      <View style={{ zIndex: -1000 }}>
        {isOpen && (
          <View style={styles.menu}>
            <TouchableOpacity
              onPress={() => {
                setIsOpen(!isOpen);
                captureLayoutData();
              }}
              style={styles.btn}
            >
              <Image source={close} style={styles.img} />
            </TouchableOpacity>
            <View style={styles.menuCont}>
              <TouchableOpacity
                style={styles.tab}
                onPress={() => {
                  setIsOpen(false);
                  navigation.navigate("Home");
                }}
              >
                <Image source={home} style={styles.tabImg} />
                <Text style={styles.tabText} ref={homeTextRef}>
                  Home
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tab}
                onPress={() => {
                  setIsOpen(false);
                  navigation.navigate("Categories");
                }}
              >
                <Image source={cat} style={styles.tabImg} />
                <Text style={styles.tabText}>Categories</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tab}
                onPress={() => {
                  setIsOpen(false);
                  setIsSearch(!isSearch);
                }}
              >
                <Image source={search} style={styles.tabImg} />
                <Text style={styles.tabText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {isSearch && (
          <>
            <TextInput
              style={styles.input}
              value={query}
              onChangeText={(text) => setQuery(text)}
              onSubmitEditing={() => onSubmitted()}
            />
            <Image source={search} style={styles.stext} />
            <TouchableOpacity
              style={styles.cb}
              onPress={() => setIsSearch(!isSearch)}
            >
              <Image source={cross} style={styles.cross} />
            </TouchableOpacity>
          </>
        )}
        {isSpotlight && (
          <View
            style={[
              styles.overlay,
              { backgroundColor: slColor, width: width, height: height },
            ]}
          />
        )}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
            <Image source={menu} style={styles.img} />
          </TouchableOpacity>
          {isSearch === false && <Text style={styles.title}>Home</Text>}
        </View>
        <ScrollView>
          <View style={styles.cardCont}>
            {data.map((recipe, index) => (
              <React.Fragment key={index}>
                {elIdx - 1 == index && nudges.length > 0 && (
                  <NudgeMaker
                    nudgeInfo={nudges[idx]}
                    setIdx={setIdx}
                    total={nudges.length}
                    idx={idx}
                    setIsSpotlight={setIsSpotlight}
                    setSlColor={setSlColor}
                    renderCard={() => (
                      <Card recipe={recipe} isSpotlight={isSpotlight} />
                    )}
                  />
                )}
                <TouchableOpacity
                  ref={(el) => (cardRefs.current[index] = el)}
                  onPress={() =>
                    navigation.navigate("IndCard", { recipe: recipe })
                  }
                >
                  <Card recipe={recipe} />
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </View>
        </ScrollView>
      </View>
    </ViewShot>
  );
};

export default Home;

const styles = StyleSheet.create({
  img: {
    width: 25,
    height: 25,
  },
  header: {
    marginVertical: 50,
    marginHorizontal: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 100,
  },
  cardCont: {
    marginHorizontal: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 150,
    zIndex: -1000,
  },
  menu: {
    width: 300,
    backgroundColor: "white",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
  btn: {
    marginLeft: 40,
    marginTop: 60,
  },
  menuCont: {
    alignItems: "center",
    marginTop: 200,
  },
  tab: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  tabText: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 20,
  },
  tabImg: {
    width: 20,
    height: 20,
  },
  input: {
    paddingVertical: 5,
    width: 200,
    position: "absolute",
    borderWidth: 1,
    top: 45,
    left: 100,
    borderRadius: 20,
    paddingHorizontal: 40,
  },
  stext: {
    position: "absolute",
    width: 20,
    height: 20,
    top: 55,
    left: 110,
  },
  cross: {
    width: 10,
    height: 10,
  },
  cb: {
    position: "absolute",
    top: 60,
    right: 80,
  },
  sorry: {
    color: "red",
    textAlign: "center",
    fontSize: 20,
    lineHeight: 25,
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    position: "absolute",
  },
});
