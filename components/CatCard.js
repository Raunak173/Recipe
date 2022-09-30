import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { recipes } from "../data";
import { useNavigation } from "@react-navigation/native";

const CatCard = ({ cat }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("CatPage", { cat: cat })}
    >
      <Image source={{ uri: cat.photo_url }} style={styles.img} />
      <Text style={styles.text}>{cat.name}</Text>
      <Text style={styles.rec}>
        {recipes.filter((rec) => cat.id === rec.categoryId).length} recipes
      </Text>
    </TouchableOpacity>
  );
};

export default CatCard;

const styles = StyleSheet.create({
  img: {
    width: 280,
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  card: {
    height: 270,
    width: 280,
    marginBottom: 20,
    borderColor: "grey",
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#e9ecef",
  },
  text: {
    fontWeight: "500",
    marginTop: 10,
    fontSize: 15,
  },
  rec: {
    marginTop: 5,
    color: "grey",
  },
});
