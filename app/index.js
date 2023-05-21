import { View } from "react-native";
import { Link, Stack, useRouter, SplashScreen } from "expo-router";
import { Button } from "react-native-paper";
import { useEffect, useState } from "react";

export default function Home() {
    const [isReady, setReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
      // Perform some sort of async data or asset fetching.
      setTimeout(() => {
        setReady(true);
      }, 1000);
    }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Use the `Screen` component to configure the layout. */}
      {!isReady && <SplashScreen />}
      <Stack.Screen options={{ title: "AiTizma" }} />
      <Button onPress={() => router.push("formPage")}>START</Button>
    </View>
  );
}
