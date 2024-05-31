import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CachedImage } from "@/helpers/image";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  Square3Stack3DIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import axios from "axios";
import Loading from "@/components/Loading";
import YouTubeIframe from "react-native-youtube-iframe";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  addFavorite,
  getAllFavorites,
  removeFavorite,
} from "@/redux/slice/favoriteSlice";

const ios = Platform.OS === "ios";

export default function RecipeDetailsScreen(props: any) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipe, setRecipe] = useState<any>();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  let item = props.route.params;
  //   console.log(props.route.params);

  useEffect(() => {
    getFullRecipeData(item.idMeal);
  }, []);

  const getFullRecipeData = async (id: number) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      //   console.log("got recipe data: ", response.data);
      if (response && response.data) {
        setRecipe(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const ingredientsIndices = (meal: any) => {
    if (!meal) return [];
    let indices = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        indices.push(i);
      }
    }
    return indices;
  };

  const getYoutubeVideoId = (url: any) => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getAllFavorites);

  // useEffect(() => {
  //   if (favorites.includes(item.idMeal)) setIsFavorite(true);
  //   else setIsFavorite(false);
  // }, [favorites, setIsFavorite, item.idMeal]);

  const handleFavorite = (item: any) => {
    // console.log("recipe: ", recipeId);
    if (favorites.includes(item)) {
      dispatch(removeFavorite(item));
      setIsFavorite(false);
      console.log("removed: ", item?.idMeal);
    } else {
      dispatch(addFavorite(item));
      setIsFavorite(true);
      console.log("added: ", item?.idMeal);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar barStyle={ios ? "light-content" : "dark-content"} />
      {/* recipe image */}
      <View className="flex-row justify-center">
        {/* <CachedImage uri={item.strMealThumb} style={{width: wp(98), height: hp(50), borderRadius: 53}} */}
        <Animated.Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
          sharedTransitionTag="item?.strMeal"
        />
      </View>

      {/* back button */}
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        className="w-full absolute flex-row justify-between items-center pt-14"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-5 bg-white"
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={"#fbbf24"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFavorite(item)}
          className="p-2 rounded-full mr-5 bg-white"
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* recipe description */}
      {loading ? (
        <Loading size="large" className="mt-10" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          {/* name and area */}
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            className="space-y-2"
          >
            <Text
              className="font-bold text-neutral-700 flex-1"
              style={{ fontSize: hp(3) }}
            >
              Name: {recipe?.strMeal}
            </Text>
            <Text
              className="font-medium text-neutral-500 flex-1"
              style={{ fontSize: hp(2) }}
            >
              Area: {recipe?.strArea}
            </Text>
            <Text
              className="font-medium text-neutral-500 flex-1"
              style={{ fontSize: hp(2) }}
            >
              Category: {recipe?.strCategory}
            </Text>
          </Animated.View>

          {/* misc */}
          <Animated.View
            entering={FadeInDown.delay(100)
              .duration(700)
              .springify()
              .damping(12)}
            className="flex-row justify-around"
          >
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                className="bg-white rounded-full flex items-center justify-center"
                style={{ width: hp(6.5), height: hp(6.5) }}
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-medium text-neutral-700"
                  style={{ fontSize: hp(2.5) }}
                >
                  35
                </Text>
                <Text
                  className="font-medium text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  Mins
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                className="bg-white rounded-full flex items-center justify-center"
                style={{ width: hp(6.5), height: hp(6.5) }}
              >
                <UserIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-medium text-neutral-700"
                  style={{ fontSize: hp(2.5) }}
                >
                  03
                </Text>
                <Text
                  className="font-medium text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  Servings
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                className="bg-white rounded-full flex items-center justify-center"
                style={{ width: hp(6.5), height: hp(6.5) }}
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-medium text-neutral-700"
                  style={{ fontSize: hp(2.5) }}
                >
                  103
                </Text>
                <Text
                  className="font-medium text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  Cal
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                className="bg-white rounded-full flex items-center justify-center"
                style={{ width: hp(6.5), height: hp(6.5) }}
              >
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color={"#525252"}
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-medium text-neutral-700"
                  style={{ fontSize: hp(2.5) }}
                ></Text>
                <Text
                  className="font-medium text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  Easy
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* ingredients */}
          <Animated.View
            entering={FadeInDown.delay(200)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-4"
          >
            <Text
              className="font-bold text-neutral-700 flex-1"
              style={{ fontSize: hp(3) }}
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientsIndices(recipe).map((index) => {
                return (
                  <View key={index} className="flex-row space-x-4 items-center">
                    <View
                      style={{ width: hp(1.5), height: hp(1.5) }}
                      className="bg-amber-300 rounded-full"
                    />
                    <View className="flex-row space-x-2">
                      <Text
                        className="text-neutral-700 font-extrabold"
                        style={{ fontSize: hp(2) }}
                      >
                        {recipe[`strMeasure${index}`]}
                      </Text>
                      <Text
                        className="text-neutral-600 font-medium"
                        style={{ fontSize: hp(2) }}
                      >
                        {recipe[`strIngredient${index}`]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          {/* instructions */}
          <Animated.View
            entering={FadeInDown.delay(300)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-4"
          >
            <Text
              className="font-bold text-neutral-700 flex-1"
              style={{ fontSize: hp(3) }}
            >
              Instructions
            </Text>
            <Text style={{ fontSize: hp(2) }} className="text-neutral-700">
              {recipe?.strInstructions}
            </Text>
          </Animated.View>

          {/* recipe video */}
          {recipe?.strYoutube && (
            <Animated.View
              entering={FadeInDown.delay(400)
                .duration(700)
                .springify()
                .damping(12)}
              className="space-y-4"
            >
              <Text
                className="font-bold text-neutral-700 flex-1"
                style={{ fontSize: hp(3) }}
              >
                Recipe Video
              </Text>
              <View className="">
                <YouTubeIframe
                  videoId={getYoutubeVideoId(recipe?.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
