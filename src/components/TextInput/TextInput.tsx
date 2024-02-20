import { colors } from "@until-failure-app/src/theme";
import React from "react";
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from "react-native";

interface TextInputProps extends RNTextInputProps {
  value: string;
  placeholder?: string;
  onChangeText?: (arg0: string) => void;
  className?: string;
}

const TextInput = ({
  value,
  placeholder,
  onChangeText,
  className = "",
  ...props
}: TextInputProps) => {
  return (
    <RNTextInput
      className={`text-md bg-secondary-900 p-4 border border-secondary-500 rounded-md text-white ${className}`}
      autoCapitalize="none"
      value={value}
      placeholderTextColor={colors.secondary["600"]}
      placeholder={placeholder}
      onChangeText={(value) => onChangeText && onChangeText(value)}
      {...props}
    />
  );
};

export default TextInput;
