import React, { createContext, useState, useContext, ReactNode } from "react";

type Song = {
  artistName: string;
  collectionName: string;
  trackName: string;
  artworkUrl100: string;
  trackPrice?: number;
  releaseDate?: string;
  currency?: string;
  primaryGenreName?: string;
  description?: string;
  trackId?: number;
};

type MusicContextType = {
  searchResults: Song[];
  isLoading: boolean;
  error: string | null;
  selectedSong: Song | null;
  searchMusic: (term?: string, limit?: number) => Promise<Song[]>;
  selectSong: (song: Song) => void;
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMusic = async (term = "jack johnson", limit = 25) => {
    setIsLoading(true);
    setError(null);

    try {
      const formattedTerm = term.trim().replace(/\s+/g, "+");
      const response = await fetch(
        `https://itunes.apple.com/search?term=${formattedTerm}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchResults(data.results);
      return data.results;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const selectSong = (song: Song) => {
    setSelectedSong(song);
  };

  return (
    <MusicContext.Provider
      value={{
        searchResults,
        isLoading,
        error,
        searchMusic,
        selectedSong,
        selectSong,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
