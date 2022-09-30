import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { recipes } from "../data";
import Card from "../components/Card";
import back from "../assets/back.png";

const CatPage = () => {
  const route = useRoute();
  const { cat } = route.params;
  const navigation = useNavigation();
  const [data, setData] = useState(recipes);

  useEffect(() => {
    setData(data.filter((rec) => rec.categoryId === cat.id));
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.img} />
        </TouchableOpacity>
        <Text style={styles.title}>{cat.name}</Text>
      </View>
      <ScrollView>
        <View style={styles.cardCont}>
          {data.map((rec) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("IndCard", { recipe: rec })}
            >
              <Card recipe={rec} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CatPage;

const styles = StyleSheet.create({
  cardCont: {
    marginHorizontal: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 150,
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
  img: {
    width: 25,
    height: 25,
  },
});
