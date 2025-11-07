import React, { useState } from "react";
import {
  Alert,
  // Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Success", "You have successfully logged in!");
    }, 1500);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Welcome Back</Text>
            <Text style={styles.headerSubtitle}>Sign in to your account</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>SIGN IN</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Enter your username"
                placeholderTextColor="#999"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={toggleShowPassword}
                >
                  <Text style={styles.eyeIcon}>
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Pressable
              style={[
                styles.button,
                (!username || !password || isLoading) && styles.buttonDisabled
              ]}
              onPress={handleLogin}
              disabled={!username || !password || isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "PLEASE WAIT..." : "SIGN IN"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#1a73e8',
    paddingHorizontal: 24,
    paddingVertical: 60,
    paddingTop: 100,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  formContainer: {
    backgroundColor: 'white',
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 40,
    minHeight: 500,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a73e8',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: 'black'
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  eyeIcon: {
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1a73e8',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});