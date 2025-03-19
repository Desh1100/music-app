import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Song {
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  artworkUrl100: string;
  trackPrice?: number;
  description?: string; // Added description field as optional
}

interface SongItemProps {
  item: Song;
  onPress: () => void;
}

const SongItem: React.FC<SongItemProps> = ({ item, onPress }) => {
  // Determine if we should add bottom margin to collection name
  const collectionNameStyle = [
    styles.collectionName,
    item.description ? { marginBottom: 2 } : null,
  ];

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Artwork */}
      <Image
        source={{ uri: item.artworkUrl100 }}
        style={styles.artwork}
        resizeMode="cover"
      />

      {/* Song details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.trackName} numberOfLines={1}>
          {item.trackName}
        </Text>
        <Text style={styles.artistName} numberOfLines={1}>
          {item.artistName}
        </Text>
        <Text style={collectionNameStyle} numberOfLines={1}>
          {item.collectionName}
        </Text>

        {/* Description - only show if available */}
        {item.description && (
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        )}
      </View>

      {/* Right arrow icon */}
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#1F1F1F",
    borderRadius: 8,
    marginBottom: 10,
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  trackName: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    marginBottom: 2,
  },
  artistName: {
    fontSize: 14,
    color: "#FBBC05",
    marginBottom: 2,
  },
  collectionName: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  description: {
    fontSize: 11,
    color: "#9CA3AF",
    fontStyle: "italic",
    lineHeight: 14,
  },
});

export default SongItem;
