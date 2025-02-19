import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CachedImage } from "@/helpers/image";

interface RecipeCardProps {
  item: any;
  index: number;
  navigation: any;
}

export default function RecipeCard({
  item,
  index,
  navigation,
}: RecipeCardProps) {
  let isEven = index % 2 === 0;

  return (
    <Animated.View
      entering={FadeInDown.duration(600)
        .delay(index * 100)
        .springify()
        .damping(12)}
    >
      <Pressable
        onPress={() => navigation.navigate("RecipeDetails", { ...item })}
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
      >
        <Animated.Image
          source={{ uri: item?.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
          sharedTransitionTag="item?.strMeal"
        />
        {/* <CachedImage
          uri={item?.strMealThumb}
          style={{
            width: "100%",
            height: index % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
          sharedTransitionTag=(item?.strMeal)
        /> */}
        <Text
          style={{ fontSize: hp(2) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item?.strMeal?.length > 20
            ? item?.strMeal?.slice(0, 20) + "..."
            : item?.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
