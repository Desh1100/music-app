import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login, isLoading } = useAuth();

  const validateInputs = () => {
    let isValid = true;

    // Reset previous errors
    setUsernameError("");
    setPasswordError("");

    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (validateInputs()) {
      await login(username, password);
    } else {
      // Show alert for missing fields
      Alert.alert(
        "Login Failed",
        "Please enter both username and password to continue (For test use any letter ot number).",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />

      {/* Logo from assets */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={[styles.input, usernameError ? styles.inputError : null]}
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            if (text.trim()) setUsernameError("");
          }}
          placeholder="kate@gmail.com"
          placeholderTextColor="#666"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {usernameError ? (
          <Text style={styles.errorText}>{usernameError}</Text>
        ) : null}

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.input,
              styles.passwordInput,
              passwordError ? styles.inputError : null,
            ]}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (text.trim()) setPasswordError("");
            }}
            placeholder="••••••"
            placeholderTextColor="#666"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.showButton}
            onPress={toggleShowPassword}
          >
            <Text style={styles.showButtonText}>
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#111" />
          ) : (
            <Text style={styles.loginButtonText}>LOGIN</Text>
          )}
        </TouchableOpacity>

        {/* Social Login Section */}
        <View style={styles.socialLoginContainer}>
          <Text style={styles.orText}>or continue with</Text>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <View style={styles.facebookButton}>
                <Text style={styles.facebookText}>f</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <View style={styles.googleButton}>
                <Text style={styles.googleText}>G</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By continuing, you agree to our Terms of Service, privacy policy
          </Text>
        </View>

        {/* Separator line */}
        <View style={styles.separator} />

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Not have an account yet? </Text>
          <Text style={styles.registerLink}>Join Us</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 180,
    height: 180,
  },
  formContainer: {
    width: "100%",
  },
  label: {
    color: "#9CA3AF",
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: "#3A3C3F",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 16,
    color: "white",
    marginBottom: 8,
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#EF4444",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  passwordInput: {
    flex: 1,
  },
  showButton: {
    position: "absolute",
    right: 16,
  },
  showButtonText: {
    color: "#FBBC05",
    fontSize: 14,
  },
  forgotPassword: {
    alignSelf: "flex-start",
    marginBottom: 24,
    marginTop: 8,
  },
  forgotPasswordText: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#FBBC05",
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialLoginContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  orText: {
    color: "#9CA3AF",
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    marginHorizontal: 10,
  },
  facebookButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3b5998",
    justifyContent: "center",
    alignItems: "center",
  },
  facebookText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  googleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  googleText: {
    color: "#DB4437",
    fontSize: 20,
    fontWeight: "bold",
  },
  termsContainer: {
    marginBottom: 24,
  },
  termsText: {
    color: "#9CA3AF",
    textAlign: "center",
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#333",
    marginBottom: 16,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  registerText: {
    color: "#9CA3AF",
  },
  registerLink: {
    color: "#FBBC05",
    fontWeight: "bold",
  },
});
