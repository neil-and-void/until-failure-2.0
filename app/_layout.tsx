import { Stack } from 'expo-router'

import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Constants from "expo-constants"
import { Redirect } from "expo-router";



export default function AppLayout() {
  return (
      <ClerkProvider publishableKey={Constants.expoConfig.extra.clerkPublishableKey}>
      <Stack>
        <Stack.Screen name='hometabs'
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ClerkProvider>
  )
}
