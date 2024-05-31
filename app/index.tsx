import AppNavigation from "@/navigation/appNavigation";
import store from "@/redux/store/store";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

export default function Page() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
