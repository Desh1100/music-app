import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMusic } from "../../context/MusicContext";

export default function DetailsScreen() {
  const { selectedSong } = useMusic();

  // Format the date to a readable format
  const formatDate = (dateString: string | number | Date) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle back button press
  const handleBackPress = () => {
    router.back();
  };

  // If no song is selected, show a message
  if (!selectedSong) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.yellowHeader}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color="#111111" />
          </TouchableOpacity>
          <Text style={[styles.title, { color: "#111111" }]}>Song Details</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.noSongContainer}>
          <Text style={styles.noSongText}>No song selected</Text>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => router.push("/(app)")}
          >
            <Text style={styles.searchButtonText}>Go to Search</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Yellow Header section */}
      <View style={styles.yellowHeader}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#111111" />
        </TouchableOpacity>

        {/* Song title */}
        <Text style={styles.songTitle}>{selectedSong.trackName}</Text>

        {/* Artwork and genre/country info */}
        <View style={styles.artworkContainer}>
          <Image
            source={{ uri: selectedSong.artworkUrl100 }}
            style={styles.artwork}
          />
          <View style={styles.genreCountryContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Genre</Text>
              <Text style={styles.infoValue}>
                {selectedSong.primaryGenreName || "Unknown"}
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Country</Text>
              <Text style={styles.infoValue}>
                {selectedSong.country || "Unknown"}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Play button */}
      <TouchableOpacity style={styles.playButton}>
        <Ionicons name="play" size={28} color="#FBBC05" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Song details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Artist Name:</Text>
            <Text style={styles.detailValue}>{selectedSong.artistName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Collection Name:</Text>
            <Text style={styles.detailValue}>
              {selectedSong.collectionName}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Track Price:</Text>
            <Text style={styles.detailValue}>
              {selectedSong.trackPrice
                ? `USD ${selectedSong.trackPrice.toFixed(2)}`
                : "Free"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Release Date:</Text>
            <Text style={styles.detailValue}>
              {formatDate(selectedSong.releaseDate)}
            </Text>
          </View>

          {selectedSong.description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionLabel}>Description:</Text>
              <Text style={styles.descriptionText}>
                {selectedSong.description}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    marginTop: 20,
  },
  yellowHeader: {
    backgroundColor: "#FBBC05",
    padding: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    padding: 16,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },
  artworkContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  artwork: {
    marginTop: 20,
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  genreCountryContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  infoBox: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: "#111111",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "500",
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#111111",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: -30,
    marginBottom: 24,
    borderWidth: 4,
    borderColor: "#FBBC05",
  },
  detailsContainer: {
    backgroundColor: "#1F1F1F",
    borderRadius: 8,
    padding: 16,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  detailLabel: {
    width: 120,
    fontSize: 14,
    fontWeight: "500",
    color: "#9CA3AF",
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: "white",
  },
  descriptionContainer: {
    marginTop: 16,
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "#9CA3AF",
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: "white",
  },
  noSongContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  noSongText: {
    fontSize: 18,
    color: "#9CA3AF",
    marginBottom: 16,
  },
  searchButton: {
    backgroundColor: "#FBBC05",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  searchButtonText: {
    color: "#111111",
    fontWeight: "500",
  },
});
