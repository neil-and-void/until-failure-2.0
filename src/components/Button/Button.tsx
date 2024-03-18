import { ReactNode } from "react";
import { Pressable, PressableProps } from "react-native";

interface ButtonProps extends PressableProps {
  type?: "primary" | "secondary";
  children: ReactNode;
  onPress?: () => void;
  buttonClassName?: string;
}

const ButtonThemes = {
  primary: "border border-neutral-50 rounded-full bg-secondary-950 active:border-secondary-600 group duration-500",
  secondary: "border border-neutral-50 rounded-full bg-white active:border-secondary-600 group duration-500",
};

export default function Button({
  type = "primary",
  children,
  onPress,
  buttonClassName = "",
}: ButtonProps) {
  return (
    <Pressable
      onPress={() => onPress && onPress()}
      className={`rounded-full px-4 py-3 ${ButtonThemes[type]} ${buttonClassName}`}
    >
      {children}
    </Pressable>
  );
}
