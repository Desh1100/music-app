import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define types for the iTunes API response
interface Song {
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  artworkUrl100: string;
  trackPrice: number;
  releaseDate: string;
  primaryGenreName?: string;
  country?: string;
  description?: string;
}

// Define the context shape
interface MusicContextType {
  searchResults: Song[];
  selectedSong: Song | null;
  isLoading: boolean;
  searchMusic: (term: string) => void;
  selectSong: (song: Song) => void;
}

// Create the context with default values
const MusicContext = createContext<MusicContextType>({
  searchResults: [],
  selectedSong: null,
  isLoading: false,
  searchMusic: () => {},
  selectSong: () => {},
});

// Create a provider component
export const MusicProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to search for music
  const searchMusic = async (term: string) => {
    try {
      setIsLoading(true);

      // Encode the search term
      const encodedTerm = encodeURIComponent(term);

      // Fetch data from iTunes API
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodedTerm}&limit=25`
      );

      const data = await response.json();

      // Filter out only music tracks
      const tracks = data.results.filter(
        (item: any) => item.kind === "song" || item.wrapperType === "track"
      );

      setSearchResults(tracks);
    } catch (error) {
      console.error("Error searching music:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to select a song
  const selectSong = (song: Song) => {
    setSelectedSong(song);
  };

  // Provide the context value
  const value = {
    searchResults,
    selectedSong,
    isLoading,
    searchMusic,
    selectSong,
  };

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};

// Custom hook to use the music context
export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
