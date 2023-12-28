import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import withCoordinates from "./withCoordinates";

const originalView = View;
const originalText = Text;
const originalImage = Image;
const originalTouchableOpacity = TouchableOpacity;
const originalTextInput = TextInput;
const originalScrollView = ScrollView;

Object.assign(View, withCoordinates(originalView));
Object.assign(Text, withCoordinates(originalText));
Object.assign(Image, withCoordinates(originalImage));
Object.assign(TouchableOpacity, withCoordinates(originalTouchableOpacity));
Object.assign(TextInput, withCoordinates(originalTextInput));
Object.assign(ScrollView, withCoordinates(originalScrollView));
