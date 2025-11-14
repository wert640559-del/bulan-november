import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface OnboardingScreenProps {
  onComplete: () => void;
  onSkip: () => void;
  screen: number;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ 
  onComplete, 
  onSkip, 
  screen 
}) => {
  const screens = [
    {
      title: "Selamat Datang di E-Commerce",
      description: "Temukan produk terbaik dengan harga terjangkau",
      image: "🛍️"
    },
    {
      title: "Belanja Mudah & Cepat",
      description: "Proses checkout yang simpel dan aman",
      image: "⚡"
    },
    {
      title: "Siap Mulai Belanja?",
      description: "Ayo mulai jelajahi produk kami",
      image: "🎉"
    }
  ];

  const currentScreen = screens[screen];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{currentScreen.image}</Text>
        <Text style={styles.title}>{currentScreen.title}</Text>
        <Text style={styles.description}>{currentScreen.description}</Text>
        
        <View style={styles.indicatorContainer}>
          {screens.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.indicator,
                index === screen && styles.indicatorActive
              ]} 
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        {screen < screens.length - 1 ? (
          <>
            <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
              <Text style={styles.skipText}>Lewati</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={onComplete}>
              <Text style={styles.nextText}>Lanjut</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.getStartedButton} onPress={onComplete}>
            <Text style={styles.getStartedText}>Mulai Belanja</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
    marginBottom: 40,
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  indicatorActive: {
    backgroundColor: '#007AFF',
    width: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skipButton: {
    padding: 16,
  },
  skipText: {
    color: '#666',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  getStartedButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  getStartedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});