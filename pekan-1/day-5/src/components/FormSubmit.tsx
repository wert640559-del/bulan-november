import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";

export default function FormSubmit() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text) return Alert.alert("Isi dulu dong!");

    setLoading(true); // disable tombol

    // simulasi proses pengiriman async
    setTimeout(() => {
      Alert.alert("Berhasil dikirim!");
      setLoading(false); // aktifkan lagi
      setText("");
    }, 2000);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Isi sesuatu..."
        style={{
          borderWidth: 1,
          borderRadius: 6,
          padding: 10,
          marginBottom: 10,
        }}
        value={text}
        onChangeText={setText}
      />

      <Button
        title={loading ? "Loading..." : "Submit"}
        onPress={handleSubmit}
        disabled={loading}
      />
    </View>
  );
}
