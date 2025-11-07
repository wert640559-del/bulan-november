import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';

// --- Interface untuk Props Komponen ---
interface ControlButtonProps {
  title: string;
  onPress: () => void;
  isActive: boolean;
}

// --- Konstanta Desain (Tetap sama) ---
const COLORS = {
  red: '#E74C3C',
  blue: '#3498DB',
  green: '#2ECC71',
  primary: '#34495E',
  secondary: '#F39C12',
  lightGray: '#ECF0F1',
};

const SPACING = {
  small: 8,
  medium: 12,
  large: 20,
};

// --- Komponen Tombol Reusable (Ditambahkan Tipe ControlButtonProps) ---
const ControlButton: React.FC<ControlButtonProps> = ({ title, onPress, isActive }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.controlButton,
      isActive && styles.activeButton,
      // Implementasi Transform untuk interaktivitas
      { transform: [{ scale: pressed ? 0.95 : 1 }] },
    ]}
  >
    <Text style={[styles.controlButtonText, isActive && styles.activeButtonText]}>
      {title}
    </Text>
  </Pressable>
);

// --- Tipe untuk State Flexbox (Memastikan Tipe String yang Valid) ---
type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';

// --- Komponen Utama Flexbox Playground (Ditambahkan Tipe React.FC) ---
const Tugas: React.FC = () => {
  // State dengan Tipe Eksplisit
  const [direction, setDirection] = useState<FlexDirection>('column');
  const [justify, setJustify] = useState<JustifyContent>('flex-start');
  const [align, setAlign] = useState<AlignItems>('flex-start');

  // Objek style dinamis (Memastikan Tipe ViewStyle)
  const flexContainerDynamicStyle: ViewStyle = {
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
  };

  return (
    <View style={styles.screen}>
      {/* Menggabungkan style statis dan dinamis */}
      <View style={[styles.flexContainer, flexContainerDynamicStyle]}>
        <View style={styles.boxRed} />
        <View style={styles.boxBlue} />
        <View style={styles.boxGreen} />
      </View>

      <View style={styles.controlsSection}>
        {/* Kontrol flexDirection */}
        <Text style={styles.controlHeader}>Flex Direction:</Text>
        <View style={styles.buttonGroup}>
          <ControlButton title="Column" onPress={() => setDirection('column')} isActive={direction === 'column'} />
          <ControlButton title="Row" onPress={() => setDirection('row')} isActive={direction === 'row'} />
          <ControlButton title="Row Reverse" onPress={() => setDirection('row-reverse')} isActive={direction === 'row-reverse'} />
        </View>

        {/* Kontrol justifyContent */}
        <Text style={styles.controlHeader}>Justify Content:</Text>
        <View style={styles.buttonGroup}>
          <ControlButton title="Start" onPress={() => setJustify('flex-start')} isActive={justify === 'flex-start'} />
          <ControlButton title="Center" onPress={() => setJustify('center')} isActive={justify === 'center'} />
          <ControlButton title="Space Between" onPress={() => setJustify('space-between')} isActive={justify === 'space-between'} />
        </View>

        {/* Kontrol alignItems */}
        <Text style={styles.controlHeader}>Align Items:</Text>
        <View style={styles.buttonGroup}>
          <ControlButton title="Start" onPress={() => setAlign('flex-start')} isActive={align === 'flex-start'} />
          <ControlButton title="Center" onPress={() => setAlign('center')} isActive={align === 'center'} />
          <ControlButton title="Stretch" onPress={() => setAlign('stretch')} isActive={align === 'stretch'} />
        </View>
      </View>
    </View>
  );
};

// --- StyleSheet.create() dengan Tipe Eksplisit ---
// Kita mendefinisikan tipe objek styles ini agar TypeScript tahu properti apa saja yang ada
// dan style mana yang harus bertipe ViewStyle atau TextStyle.

interface Style {
    screen: ViewStyle;
    flexContainer: ViewStyle;
    boxRed: ViewStyle;
    boxBlue: ViewStyle;
    boxGreen: ViewStyle;
    controlsSection: ViewStyle;
    controlHeader: TextStyle;
    buttonGroup: ViewStyle;
    controlButton: ViewStyle;
    activeButton: ViewStyle;
    controlButtonText: TextStyle;
    activeButtonText: TextStyle;
}

// StyleSheet.create secara otomatis infer tipe yang benar,
// tapi mendefinisikan interface Style di atas memastikan kode lebih kuat dan membantu intellisense.
const styles = StyleSheet.create<Style>({
  screen: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    paddingTop: 50,
  },
  flexContainer: {
    flex: 2,
    borderWidth: 2,
    borderColor: COLORS.primary,
    margin: SPACING.medium,
    backgroundColor: 'white',
    padding: SPACING.small,
  },
  boxRed: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.red,
    margin: SPACING.small,
  },
  boxBlue: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.blue,
    margin: SPACING.small,
  },
  boxGreen: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.green,
    margin: SPACING.small,
  },
  controlsSection: {
    flex: 1,
    paddingHorizontal: SPACING.medium,
    paddingBottom: SPACING.large,
  },
  controlHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: SPACING.medium,
    marginBottom: SPACING.small,
    color: COLORS.primary,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.small,
  },
  controlButton: {
    flex: 1,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.small,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeButton: {
    backgroundColor: COLORS.secondary,
  },
  controlButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeButtonText: {
    fontWeight: 'bold',
  }
});

export default Tugas;