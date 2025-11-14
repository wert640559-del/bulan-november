import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";

type SettingsProps = {
  drawerLocked: boolean;
  setDrawerLocked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Settings: React.FC<SettingsProps> = ({ drawerLocked, setDrawerLocked }) => {
  const navigation = useNavigation<any>();

  const goToHomeAndCloseDrawer = () => {
    navigation.navigate("Home");
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.row}>
        <Text>Fitur Pengaturan</Text>
        <Text style={styles.comingSoon}>Coming Soon</Text>
      </View>

      <Button title="Ke Halaman Home" onPress={goToHomeAndCloseDrawer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  row: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  comingSoon: {
    color: '#666',
    fontStyle: 'italic',
  }
});