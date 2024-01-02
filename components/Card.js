import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { categories } from "../data";

const Card = ({ recipe }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: recipe.photo_url }} style={styles.img} />
      <Text style={styles.text}>{recipe.title}</Text>
      {categories.map((category) => {
        if (category.id === recipe.categoryId) {
          return <Text style={styles.text}>{category.name}</Text>;
        }
      })}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  img: {
    height: 130,
    width: 130,
    resizeMode: "cover",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  card: {
    height: 190,
    width: 130,
    marginBottom: 20,
    borderColor: "grey",
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#e9ecef",
    zIndex: -1000,
  },
  text: {
    fontWeight: "500",
  },
});
