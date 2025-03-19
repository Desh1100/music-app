import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#111111",
        },
        animation: "slide_from_right",
      }}
    />
  );
}
