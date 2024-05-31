import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import React, { useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

export default function WelcomeScreen() {
  const ring_one_padding = useSharedValue(0);
  const ring_two_padding = useSharedValue(0);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    ring_one_padding.value = 0;
    ring_two_padding.value = 0;

    setTimeout(() => {
      ring_one_padding.value = withSpring(ring_one_padding.value + hp(5));
    }, 100);
    setTimeout(() => {
      ring_two_padding.value = withSpring(ring_one_padding.value + hp(5.5));
    }, 300);

    setTimeout(() => {
      navigation.navigate("Home");
    }, 2500);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-amber-500 space-y-10">
      <StatusBar barStyle={"light-content"} />

      {/* logo image with rings */}
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{ padding: ring_two_padding }}
      >
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: ring_one_padding }}
        >
          <Image
            source={require("../assets/images/welcome.jpg")}
            style={{ width: hp(20), height: hp(20), resizeMode: "cover" }}
            className="rounded-full"
          />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View className="flex items-center space-y-2">
        <Text
          className="font-bold text-white tracking-widest"
          style={{ fontSize: hp(7) }}
        >
          Foody
        </Text>
        <Text
          className="font-medium text-white tracking-widest"
          style={{ fontSize: hp(2) }}
        >
          Food is always right
        </Text>
      </View>
    </View>
  );
}
