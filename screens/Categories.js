import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import back from "../assets/back.png";
import { useNavigation } from "@react-navigation/native";
import { categories } from "../data";
import CatCard from "../components/CatCard";

const Categories = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.img} />
        </TouchableOpacity>
        <Text style={styles.title}>Categories</Text>
      </View>
      <ScrollView>
        <View style={styles.cardCont}>
          {categories.map((cat, index) => (
            <CatCard cat={cat} key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Categories;

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
});
