import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ingredients } from "../data";

const IngCard = ({ item }) => {
  return (
    <View style={styles.card}>
      {ingredients.map((i) => {
        if (i.ingredientId === item[0]) {
          return (
            <View>
              <Image source={{ uri: i.photo_url }} style={styles.img} />
              <Text style={styles.text}>{i.name}</Text>
              <Text style={styles.qty}>{item[1]}</Text>
            </View>
          );
        }
      })}
    </View>
  );
};

export default IngCard;

const styles = StyleSheet.create({
  card: {
    width: 90,
    height: 180,
    marginBottom: 20,
    justifyContent: "center",
    borderColor: "grey",
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#e9ecef",
  },
  img: {
    width: 80,
    height: 100,
    resizeMode: "cover",
  },
  text: {
    textAlign: "center",
    marginTop: 10,
  },
  qty: {
    textAlign: "center",
    color: "grey",
    fontSize: 10,
    marginTop: 5,
  },
});
