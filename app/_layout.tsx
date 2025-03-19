import React, { useEffect } from "react";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { MusicProvider } from "../context/MusicContext";

// This component handles protecting routes based on authentication
function RootLayoutNav() {
  const { user } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    // If the user is not signed in and not on the auth screen,
    // redirect to the login screen
    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login");
    }
    // If the user is signed in and on the auth screen,
    // redirect to the main screen
    else if (user && inAuthGroup) {
      router.replace("/(app)");
    }
  }, [user, segments]);

  return <Slot />;
}

// Root layout that provides all the necessary context providers
export default function RootLayout() {
  return (
    <AuthProvider>
      <MusicProvider>
        <RootLayoutNav />
      </MusicProvider>
    </AuthProvider>
  );
}
