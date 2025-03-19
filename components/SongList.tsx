import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import SongItem from "./SongItem";

type Song = {
  artistName: string;
  collectionName: string;
  trackName: string;
  artworkUrl100: string;
  trackId: number;
  trackPrice?: number;
  releaseDate?: string;
  primaryGenreName?: string;
  country?: string;
  description?: string;
};

type SongListProps = {
  data: Song[];
  isLoading: boolean;
  onSelect: (item: Song) => void;
};

export default function SongList({ data, isLoading, onSelect }: SongListProps) {
  // Render loading indicator when loading
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FBBC05" />
      </View>
    );
  }

  // Render empty component when no data
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        No songs found. Try searching for something else.
      </Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) =>
        item.trackId ? item.trackId.toString() : Math.random().toString()
      }
      renderItem={({ item }) => (
        <SongItem item={item} onPress={() => onSelect(item)} />
      )}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
}

const styles = StyleSheet.create({
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
