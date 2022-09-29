import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { categories } from "../data";
import clock from "../assets/clock.png";
import backg from "../assets/backg.png";

const IndCard = () => {
  const route = useRoute();
  const { recipe } = route.params;
  const [images] = useState(recipe.photosArray);
  const navigation = useNavigation();
  return (
    <ScrollView>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Image source={backg} style={styles.bi} />
      </TouchableOpacity>
      <View style={{ marginBottom: 50 }}>
        <ScrollView horizontal={true}>
          <View style={styles.carousel}>
            {images.map((image) => (
              <Image source={{ uri: image }} style={styles.img} />
            ))}
          </View>
        </ScrollView>
        <Text style={styles.title}>{recipe.title}</Text>
        {categories.map((category) => {
          if (category.id === recipe.categoryId) {
            return (
              <Text style={styles.text}>{category.name.toUpperCase()}</Text>
            );
          }
        })}
        <View style={styles.time}>
          <Image source={clock} style={styles.clock} />
          <Text style={styles.timeText}>{recipe.time} minutes</Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Ing", { recipe: recipe })}
        >
          <Text style={styles.btnText}>View Ingredients</Text>
        </TouchableOpacity>
        <Text style={styles.des}>{recipe.description}</Text>
      </View>
    </ScrollView>
  );
};

export default IndCard;

const styles = StyleSheet.create({
  img: {
    width: 400,
    height: 250,
    resizeMode: "cover",
  },
  carousel: {
    width: "100%",
    height: 250,
    flexDirection: "row",
  },
  title: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 25,
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    marginTop: 20,
    color: "#2ec4b6",
    fontWeight: "500",
  },
  clock: {
    width: 30,
    height: 30,
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  timeText: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
  },
  btn: {
    paddingVertical: 10,
    borderWidth: 1,
    width: 250,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 30,
    borderColor: "#06d6a0",
    marginVertical: 30,
  },
  btnText: {
    textAlign: "center",
    color: "#06d6a0",
  },
  des: {
    marginHorizontal: 50,
    fontSize: 20,
    lineHeight: 30,
  },
  back: {
    position: "absolute",
    zIndex: 1,
    marginLeft: 30,
    marginTop: 40,
  },
  bi: {
    width: 50,
    height: 50,
  },
});
