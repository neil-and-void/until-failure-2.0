import { ReactNode } from "react";
import { Pressable, PressableProps, View } from "react-native";

interface ButtonProps extends PressableProps {
  type?: "primary" | "secondary";
  children: ReactNode;
  onPress?: () => void;
  buttonClassName?: string;
}

export default function Button({
  type = "primary",
  children,
  onPress,
  buttonClassName = "",
}: ButtonProps) {
  return (
    <Pressable
      onPress={() => onPress && onPress()}
      className={`border border-neutral-50 rounded-full px-4 py-3 bg-secondary-950 active:border-secondary-600 group duration-500 ${buttonClassName}`}
    >
      {children}
    </Pressable>
  );
}
