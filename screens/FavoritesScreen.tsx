import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getAllFavorites, removeFavorite } from "@/redux/slice/favoriteSlice";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

const ios = Platform.OS === "ios";

export default function FavoritesScreen(props: any) {
  const [allFavorites, setAllFavorites] = useState([]);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  //   const favorites = useAppSelector(getAllFavorites);
  const dispatch = useAppDispatch();

  const favorites = props.route.params;
  console.log("favorites: ", favorites.favorites.length);

  useEffect(() => {
    if (favorites.favorites.length > 0) {
      setAllFavorites(favorites.favorites);
    } else {
      setAllFavorites([]);
    }
  }, [favorites.favorites, setAllFavorites]);

  const handleRemove = (itemId: any) => {
    dispatch(removeFavorite(itemId));
    // setAllFavorites((prev: any) =>
    //   prev.filter((item: any) => item.idMeal !== itemId)
    // );
    setAllFavorites(allFavorites.filter((item: any) => item.idMeal !== itemId));
  };

  return (
    <View className="flex-1 bg-neutral-300 pt-3 relative">
      <StatusBar barStyle={ios ? "light-content" : "dark-content"} />
      {/* back button */}
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        className="flex-row justify-between items-center"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-5 bg-white"
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={"#fbbf24"} />
        </TouchableOpacity>
        {/* <TouchableOpacity className="p-2 rounded-full mr-5 bg-white">
            <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={"gray"} />
          </TouchableOpacity> */}
        <TouchableOpacity className="relative p-2 rounded-full bg-white mr-5">
          <HeartIcon size={hp(4.5)} strokeWidth={4.5} color={"red"} />
          <Text
            className="absolute top-1 right-0.5 font-semibold text-black"
            style={{ fontSize: wp(4.5) }}
          >
            {allFavorites.length}
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <ScrollView showsVerticalScrollIndicator={false} className="">
        {allFavorites.length > 0 ? (
          allFavorites.map((item: any, index: number) => (
            <View
              key={index}
              className="flex-row justify-between items-center p-5 border-b border-gray-500"
            >
              <View className="flex-row items-center gap-3">
                {/* recipe image */}
                <View className="flex-row justify-center">
                  {/* <CachedImage uri={item.strMealThumb} style={{width: wp(98), height: hp(50), borderRadius: 53}} */}
                  <Animated.Image
                    source={{ uri: item?.strMealThumb }}
                    style={{
                      width: hp(12),
                      height: hp(12),
                      borderRadius: 10,
                      marginTop: 4,
                    }}
                    sharedTransitionTag="item?.strMeal"
                  />
                </View>

                {/* name and area */}
                <Animated.View
                  entering={FadeInDown.duration(700).springify().damping(12)}
                  className="space-y-1"
                >
                  <Text
                    className="font-semibold text-neutral-700 flex-1"
                    style={{ fontSize: hp(2.5) }}
                  >
                    {item?.strMeal.length > 15
                      ? item?.strMeal.slice(0, 15)
                      : item?.strMeal}
                  </Text>
                  <Text
                    className="font-medium text-neutral-500 flex-1"
                    style={{ fontSize: hp(2) }}
                  >
                    Area: {item?.strArea}
                  </Text>
                  <Text
                    className="font-medium text-neutral-500 flex-1"
                    style={{ fontSize: hp(2) }}
                  >
                    Category: {item?.strCategory}
                  </Text>
                </Animated.View>
              </View>

              {/* delete */}
              <Pressable onPress={() => handleRemove(item?.idMeal)}>
                <Text className="font-bold text-red-500">Remove</Text>
              </Pressable>
            </View>
          ))
        ) : (
          <View className="flex-1 flex justify-center items-center mt-20">
            <Text className="text-xl font-bold text-white">No Favorites</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
