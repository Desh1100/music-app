import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useMusic } from "../../context/MusicContext";

export default function DetailsScreen() {
  const { selectedSong } = useMusic();

  // If no song is selected, display a message and return to the search screen
  if (!selectedSong) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.noSongContainer}>
          <Text style={styles.noSongText}>No song selected.</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Format the release date
  const formatReleaseDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Format the price
  const formatPrice = (price?: number, currency?: string) => {
    if (price === undefined || price === null) return "Free";
    return `${currency || "$"}${price.toFixed(2)}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={28} color="#FBBC05" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {selectedSong.trackName || "Song Details"}
          </Text>
        </View>

        {/* Song details card */}
        <View style={styles.card}>
          {/* Artwork */}
          <View style={styles.artworkContainer}>
            <Image
              source={{
                uri:
                  selectedSong.artworkUrl100?.replace("100x100", "600x600") ||
                  selectedSong.artworkUrl100,
              }}
              style={styles.artwork}
              resizeMode="contain"
            />
            <View style={styles.playButton}>
              <Ionicons name="play" size={32} color="white" />
            </View>
          </View>

          {/* Song information */}
          <View style={styles.infoContainer}>
            <Text style={styles.artistName}>{selectedSong.artistName}</Text>
            <Text style={styles.collectionName}>
              {selectedSong.collectionName}
            </Text>
            <Text style={styles.trackName}>{selectedSong.trackName}</Text>

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Track Price</Text>
                <Text style={styles.detailValue}>
                  {formatPrice(selectedSong.trackPrice, selectedSong.currency)}
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Release Date</Text>
                <Text style={styles.detailValue}>
                  {formatReleaseDate(selectedSong.releaseDate)}
                </Text>
              </View>
            </View>

            {selectedSong.primaryGenreName && (
              <View style={styles.genreContainer}>
                <Text style={styles.detailLabel}>Genre</Text>
                <View style={styles.genreBadge}>
                  <Text style={styles.genreText}>
                    {selectedSong.primaryGenreName}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backIcon: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    flex: 1,
  },
  card: {
    backgroundColor: "#1F313F",
    borderRadius: 12,
    overflow: "hidden",
  },
  artworkContainer: {
    position: "relative",
    height: 300,
    backgroundColor: "#000",
  },
  artwork: {
    width: "100%",
    height: "100%",
  },
  playButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(251, 188, 5, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    padding: 20,
  },
  artistName: {
    fontSize: 16,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  collectionName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FBBC05",
    marginBottom: 4,
  },
  trackName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  detailsRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  genreContainer: {
    marginBottom: 20,
  },
  genreBadge: {
    backgroundColor: "#3A3C3F",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  genreText: {
    color: "white",
    fontSize: 14,
  },
  noSongContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  noSongText: {
    fontSize: 18,
    color: "white",
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: "#FBBC05",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  backButtonText: {
    color: "#111111",
    fontWeight: "bold",
  },
});
