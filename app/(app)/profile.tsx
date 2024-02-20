import { Button } from "react-native";
import { useAuth, useSession } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { isLoaded, signOut } = useAuth();

  const { session } = useSession();

  const getToken = () => {
    session?.getToken().then((res) => console.log(res));
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <SafeAreaView className="px-4">
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
      <Button
        title="Get Token"
        onPress={() => {
          getToken();
        }}
      />
    </SafeAreaView>
  );
}
