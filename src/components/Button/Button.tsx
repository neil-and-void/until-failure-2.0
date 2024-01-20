import { Pressable, PressableProps, View } from "react-native";
import { ReactNode } from "react";

interface ButtonProps extends PressableProps {
  children: ReactNode;
  onPress?: () => void;
  buttonClassName?: string;
}

export default function Button({
  children,
  onPress,
  buttonClassName = "",
}: ButtonProps) {
  return (
    <Pressable onPress={() => onPress && onPress()}>
      <View
        className={`border border-neutral-50 rounded-full px-4 py-3 bg-secondary-950 active:bg-primary-100 group ${buttonClassName}`}
      >
        {children}
      </View>
    </Pressable>
  );
}
