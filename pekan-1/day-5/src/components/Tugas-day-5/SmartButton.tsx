import React from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from "react-native";

type SmartButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  color?: string; // Warna custom
};

export default function SmartButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  color = "green",
}: SmartButtonProps) {
  const isDisabled = loading || disabled;

  return (
    <Pressable
      android_ripple={{ color: "#ff000055" }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color },
        pressed && Platform.OS !== "android" && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
      ]}
      onPress={!isDisabled ? onPress : undefined}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "80%",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // Wajib untuk ripple Android!
  },
  pressed: {
    opacity: 0.7, // efek dimming untuk iOS/Web
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
