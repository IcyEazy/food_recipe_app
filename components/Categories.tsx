import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { categoryData } from "@/constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CachedImage } from "@/helpers/image";

interface Props {
  categories: any[];
  activeCategory: string;
  handleChangeCategory: any;
}

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}: Props) {
  return (
    <Animated.View
      entering={FadeInDown.duration(500).springify()}
      className="mt-6"
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((category, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="flex items-center space-y-1"
              onPress={() => handleChangeCategory(category.strCategory)}
            >
              <View
                className={`rounded-full p-[6px] ${
                  activeCategory === category.strCategory
                    ? "bg-amber-400"
                    : "bg-black/10"
                }`}
              >
                <Image
                  source={{ uri: category.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6) }}
                  resizeMode="cover"
                  className="rounded-full"
                />
                {/* <CachedImage
                uri={category.strCategoryThumb}
                  style={{ width: hp(6), height: hp(6) }}
                  resizeMode="cover"
                  className="rounded-full"
                 /> */}
              </View>
              <Text
                className="text-neutral-600 text-center"
                style={{ fontSize: hp(2) }}
              >
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
