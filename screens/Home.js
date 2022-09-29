import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import menu from "../assets/menu.png";
import close from "../assets/close.png";
import { recipes } from "../data";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import cat from "../assets/cat.png";
import home from "../assets/home.png";
import search from "../assets/search.png";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const navigation = useNavigation();
  return (
    <View>
      {isOpen && (
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => setIsOpen(!isOpen)}
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
              {isSearch === false && <Text style={styles.tabText}>Home</Text>}
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
      {isSearch && <TextInput style={styles.input} />}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <Image source={menu} style={styles.img} />
        </TouchableOpacity>
        {isSearch === false && <Text style={styles.title}>Home</Text>}
      </View>
      <ScrollView>
        <View style={styles.cardCont}>
          {recipes.map((recipe) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("IndCard", { recipe: recipe })}
            >
              <Card recipe={recipe} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
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
    marginLeft: 80,
  },
  cardCont: {
    marginHorizontal: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 150,
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
    paddingHorizontal: 10,
  },
});
