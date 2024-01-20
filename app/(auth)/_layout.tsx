import React from "react";
import { Stack } from "expo-router";
import { colors } from "@until-failure-app/src/theme";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.secondary["950"] },
        headerStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen
        name="greeting"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="create-account"
        options={{
          headerTintColor: colors.secondary[50],
          title: "Create Account",
        }}
      />
      <Stack.Screen
        name="signin"
        options={{
          headerTintColor: colors.secondary[50],
          title: "Sign In",
        }}
      />
    </Stack>
  );
}
