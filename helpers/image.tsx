import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated from "react-native-reanimated";

export const CachedImage = (props: any) => {
  const [cachedSource, setCachedSource] = useState<{}>();
  const { uri } = props;

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        const cachedImageData = await AsyncStorage.getItem(uri);
        if (cachedImageData) {
          setCachedSource({ uri: cachedImageData });
        } else {
          const response = await fetch(uri);
          const imageBlob = await response.blob();
          const base64Data = await new Promise<any>((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => {
              resolve(reader.result);
            };
          });
          await AsyncStorage.setItem(uri, base64Data);
          setCachedSource({ uri: base64Data });
        }
      } catch (error) {
        console.error("Error fetching or caching image:", error);
        setCachedSource({ uri });
      }
    };
    getCachedImage();
  }, []);

  return <Animated.Image source={cachedSource} {...props} />;
};
