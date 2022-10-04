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
import back from "../assets/back.png";
import IngCard from "../components/IngCard";

const Ingred = () => {
  const route = useRoute();
  const { recipe } = route.params;
  const navigation = useNavigation();
  const [ing] = useState(recipe.ingredients);
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.img} />
        </TouchableOpacity>
        <Text style={styles.title}>Ingredients</Text>
      </View>
      <ScrollView>
        <View style={styles.cardCont}>
          {ing.map((item, index) => (
            <IngCard item={item} key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Ingred;

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
