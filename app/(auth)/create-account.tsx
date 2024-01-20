import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import { colors } from "@until-failure-app/src/theme";
import Button from "@until-failure-app/src/components/Button";

export default function CreateAccountScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<null | string>(null);

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      let errMsg = "Sorry, something went wrong :(";
      if (err?.errors.length > 0 && err.errors[0].message) {
        errMsg = err.errors[0].message;
      }

      setError(errMsg);
    }
  };

  return (
    <View className="p-4">
      {!pendingVerification && (
        <View>
          <View className="pb-2">
            <Text className="text-white">
              Firstname<Text className="text-error">*</Text>
            </Text>
            <TextInput
              autoCapitalize="none"
              value={firstName}
              placeholder="First Name..."
              onChangeText={(firstName) => setFirstName(firstName)}
              className="text-md bg-secondary-900 p-4 border border-secondary-500 rounded-md text-white"
              placeholderTextColor={colors.secondary["600"]}
            />
          </View>

          <View className="pb-2">
            <Text className="text-white">
              Lastname<Text className="text-error">*</Text>
            </Text>
            <TextInput
              className="text-md bg-secondary-900 p-4 border border-secondary-500 rounded-md text-white"
              placeholderTextColor={colors.secondary["600"]}
              autoCapitalize="none"
              value={lastName}
              placeholder="Last Name..."
              onChangeText={(lastName) => setLastName(lastName)}
            />
          </View>

          <View className="pb-2">
            <Text className="text-white">
              Email<Text className="text-error">*</Text>
            </Text>
            <TextInput
              className="text-md bg-secondary-900 p-4 border border-secondary-500 rounded-md text-white"
              placeholderTextColor={colors.secondary["600"]}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
            />
          </View>

          <View className="pb-2">
            <Text className="text-white">
              Password<Text className="text-error">*</Text>
            </Text>
            <TextInput
              className="text-md bg-secondary-900 p-4 border border-secondary-500 rounded-md text-white"
              placeholderTextColor={colors.secondary["600"]}
              value={password}
              placeholder="Password..."
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <View>
            <Text className="text-error pb-6">{error ? error : " "}</Text>
          </View>

          <Button onPress={onSignUpPress}>
            <Text className="text-white text-center font-bold">
              Create Account
            </Text>
          </Button>
        </View>
      )}
      {pendingVerification && (
        <View>
          <View>
            <TextInput
              value={code}
              className="text-md bg-secondary-900 p-4 border border-secondary-500 rounded-md text-white"
              placeholderTextColor={colors.secondary["600"]}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <Button onPress={onPressVerify}>
            <Text className="text-white text-center">Verify Email</Text>
          </Button>
        </View>
      )}
    </View>
  );
}
