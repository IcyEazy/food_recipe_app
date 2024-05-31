import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Platform,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "@/components/Categories";
import axios from "axios";
import Recipes from "@/components/Recipes";
import { HeartIcon } from "react-native-heroicons/solid";
import { useAppSelector } from "@/redux/hooks/hooks";
import { getAllFavorites } from "@/redux/slice/favoriteSlice";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

const ios = Platform.OS === "ios";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState<string>("Beef");
  const [categories, setCategories] = useState<any[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getCategories();
    getRecipes();
    getSearchRecipes(search);
  }, []);

  const handleChangeCategory = (category: string) => {
    setActiveCategory(category);
    getRecipes(category);
    setRecipes([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      // console.log("got categories: ", response.data);
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const getRecipes = async (category = activeCategory || "Beef") => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      // console.log("got recipes: ", response.data);
      if (response && response.data) {
        setRecipes(response.data.meals);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const getSearchRecipes = async (search: string) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      // console.log("got searched recipes: ", response.data);
      if (response && response.data) {
        setRecipes(response.data.meals);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleSearch = (search: string) => {
    // console.log("search: ", search);
    if (search.length < 3) return;
    setSearch(search);
    getSearchRecipes(search);
    setRecipes([]);
  };
  const clearSearch = () => {
    setSearch("");
    getRecipes();
    setRecipes([]);
  };

  const favorites = useAppSelector(getAllFavorites);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className={`space-y-6 ${ios && "pt-14"}`}
      >
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../assets/images/avatar.png")}
            resizeMode="contain"
            style={{ height: hp(5), width: hp(5.5) }}
          />
          {/* <BellIcon size={hp(4)} color="gray" /> */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Favorites", { favorites })}
            className="relative p-2 rounded-full bg-white"
          >
            <HeartIcon size={hp(4.5)} strokeWidth={4.5} color={"red"} />
            <Text
              className="absolute top-1 right-1 font-semibold text-black"
              style={{ fontSize: wp(4.5) }}
            >
              {favorites.length}
            </Text>
          </TouchableOpacity>
        </View>

        {/* greetings and punchline */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(2) }} className="text-neutral-600">
            Hello, Israel
          </Text>
          <View className="">
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              Make your own food recipe,
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View className="space-y-2">
          <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search any recipe"
              placeholderTextColor={"gray"}
              style={{ fontSize: hp(2) }}
              className="flex-1 text-base mb-1 pl-3 tracking-wider"
            />
            <TouchableOpacity
              onPress={() => handleSearch(search)}
              className="bg-white rounded-full p-3"
            >
              <MagnifyingGlassIcon
                size={hp(2.5)}
                color="gray"
                strokeWidth={3}
              />
            </TouchableOpacity>
          </View>
          <Pressable className="flex-row justify-end" onPress={clearSearch}>
            <Text
              className="mx-8 text-neutral-600"
              style={{ fontSize: hp(2.5) }}
            >
              Clear
            </Text>
          </Pressable>
        </View>

        {/* categories */}
        {categories.length > 0 && (
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        )}

        {/* recipes */}
        <View>
          <Recipes categories={categories} recipes={recipes} />
        </View>
      </ScrollView>
    </View>
  );
}
