import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Song = {
  artistName: string;
  collectionName: string;
  trackName: string;
  artworkUrl100: string;
};

type SongItemProps = {
  item: Song;
  onPress: () => void;
};

export default function SongItem({ item, onPress }: SongItemProps) {
  return (
    <TouchableOpacity style={styles.songItem} onPress={onPress}>
      <Image
        source={{ uri: item.artworkUrl100 }}
        style={styles.artwork}
        resizeMode="cover"
      />
      <View style={styles.songInfo}>
        <Text style={styles.trackName} numberOfLines={1}>
          {item.trackName || "Unknown Track"}
        </Text>
        <Text style={styles.artistName} numberOfLines={1}>
          {item.artistName}
        </Text>
        <Text style={styles.collectionName} numberOfLines={1}>
          {item.collectionName}
        </Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Ionicons name="ellipsis-vertical" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  songItem: {
    flexDirection: "row",
    backgroundColor: "#1F313F",
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    alignItems: "center",
  },
  artwork: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  songInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  trackName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  artistName: {
    color: "#9CA3AF",
    fontSize: 14,
    marginBottom: 2,
  },
  collectionName: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  moreButton: {
    padding: 8,
  },
});
