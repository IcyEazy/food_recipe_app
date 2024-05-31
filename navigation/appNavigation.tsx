import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import DetailsScreen from "@/screens/WelcomeScreen";
import WelcomeScreen from "@/screens/WelcomeScreen";
import RecipeDetailsScreen from "@/screens/RecipeDetailsScreen";
import FavoritesScreen from "@/screens/FavoritesScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}
