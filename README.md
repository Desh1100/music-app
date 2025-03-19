# iTunes Music Search App

A React Native mobile application built with Expo that allows users to search and browse music via the iTunes Search API.


## Features

- **User Authentication:** Secure login screen with username/password authentication
- **iTunes API Integration:** Search for songs, albums, and artists
- **Search Results:** Display up to 25 search results at a time
- **Song Details:** View detailed information about selected songs
- **Responsive Design:** Works on both iOS and Android devices

## Technologies Used

- React Native
- TypeScript
- Expo with Expo Router
- iTunes Search API
- Context API for state management

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/itunes-music-app.git
   cd itunes-music-app
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npx expo start
   ```

## How to Use

1. **Login Screen:** Enter your credentials to access the app
2. **Search:** Use the search bar to find songs by artist name (e.g., "Jack Johnson")
3. **Browse Results:** Scroll through the list of songs (limited to 25 results)
4. **View Details:** Tap on a song to see more information
5. **Return to Search:** Use the back button to return to search results

## API Integration

The app uses the iTunes Search API with the following endpoint:

```
https://itunes.apple.com/search?term={searchTerm}&limit=25
```

This ensures that search results are limited to 25 records for optimal performance.



## Customization

You can customize the appearance by modifying the styles in each component. The app uses these main colors:

- Primary: `#FBBC05` (Gold)
- Background: `#111111` (Dark)
- Text on light backgrounds: `#111111`
- Text on dark backgrounds: `#FFFFFF`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*This project was created as part of a React Native practical exam for rootcode.*
