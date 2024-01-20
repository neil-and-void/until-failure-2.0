import { Pressable, Text, TextInput, View } from "react-native";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import Button from "@until-failure-app/src/components/Button";
import { colors } from "@until-failure-app/src/theme";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { signOut } = useAuth();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>(null);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });

      router.replace("/sessions");
    } catch (err: any) {
      let errMsg = "Sorry, something went wrong :(";
      if (err?.errors.length > 0 && err.errors[0].message) {
        errMsg = err.errors[0].message;
      }

      setError(errMsg);
    }
  };

  return (
    <View>
      <View className="p-4">
        <View className="pb-2">
          <Text className="text-white">Email</Text>
          <TextInput
            className="text-md bg-secondary-900 p-4 border  border-secondary-500 rounded-md text-white"
            autoCapitalize="none"
            value={emailAddress}
            placeholderTextColor={colors.secondary["600"]}
            placeholder="Email"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
        </View>

        <View className="pb-2">
          <Text className="text-white">Password</Text>
          <TextInput
            className="text-md bg-secondary-900 p-4 border border-secondary-500 rounded-md text-white"
            value={password}
            placeholderTextColor={colors.secondary["600"]}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <View>
          <Text className="text-error pb-6">{error ? error : " "}</Text>
        </View>

        <Button onPress={onSignInPress}>
          <Text className="text-white group-active:text-warning text-center font-bold">
            Login
          </Text>
        </Button>

        <View className="pt-4">
          <Button onPress={() => signOut()}>
            <Text className="text-white font-bold text-center">signout</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
