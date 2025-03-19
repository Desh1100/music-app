import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useMusic } from "../../context/MusicContext";
import { useAuth } from "../../context/AuthContext";
import SongItem from "../../components/SongItem";

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchMusic, searchResults, isLoading, selectSong } = useMusic();
  const { logout } = useAuth();

  useEffect(() => {
    // Load initial results when the component mounts
    searchMusic("jack johnson");
  }, []);

  const handleSearch = () => {
    searchMusic(searchTerm || "jack johnson");
  };

  const handleSelectSong = (song: any) => {
    selectSong(song);
    router.push("/(app)/details");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header with search and logout */}
      <View style={styles.header}>
        <Text style={styles.title}>Music Search</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color="#FBBC05" />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search artist, song, or album..."
          placeholderTextColor="#9CA3AF"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Results counter */}
      <View style={styles.resultCount}>
        <Text style={styles.resultCountText}>
          {searchResults.length} results • limited to 25
        </Text>
      </View>

      {/* Song list */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FBBC05" />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) =>
            item.trackId ? item.trackId.toString() : Math.random().toString()
          }
          renderItem={({ item }) => (
            <SongItem item={item} onPress={() => handleSelectSong(item)} />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No songs found. Try searching for something else.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  logoutButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: "row",
    margin: 16,
    backgroundColor: "#3A3C3F",
    borderRadius: 8,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    color: "white",
  },
  searchButton: {
    padding: 12,
  },
  resultCount: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  resultCountText: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    color: "#9CA3AF",
    textAlign: "center",
  },
});
