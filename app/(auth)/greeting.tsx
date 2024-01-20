import React from "react";
import { Link, router } from "expo-router";
import { Text, View } from "react-native";
import Button from "@until-failure-app/src/components/Button";

export default function Greeting() {
  return (
    <View>
      <Text className="text-white text-center text-2xl pb-4">
        Until Failure
      </Text>
      <View className="pb-2">
        <Button onPress={() => router.push("/signin")}>
          <Text className="text-white text-center">sign-in</Text>
        </Button>
      </View>
      <View>
        <Button onPress={() => router.push("/create-account")}>
          <Text className="text-white text-center">create account</Text>
        </Button>
      </View>
    </View>
  );
}
