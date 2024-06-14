import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, FlatList } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://www.omdbapi.com/?apikey=ad79dbd4&s=movie') // Make sure to replace 'yourapikey' with your actual OMDb API key
      .then(response => response.json())
      .then(data => {
        setMovies(data.Search); // Assuming the movie data is under the 'Search' key in the API response
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/semi-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bem vindo ao CineNaMão</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText type="subtitle">Destaques</ThemedText>
      <FlatList
        data={movies}
        style={{ display: 'flex', flexDirection: 'row', padding: 8, gap: 8, flex: 1 }}
        // keyExtractor={(item) => item.imdbID} // Assuming 'imdbID' can be used as a unique key
        renderItem={({ item }) => (
          <ThemedView style={styles.movieContainer}>
            <Image source={{ uri: item.Poster }} style={styles.moviePoster} />
            <ThemedText type="subtitle">{item.Title}</ThemedText>
          </ThemedView>
        )}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  movieContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
    marginBottom: 8,
    width: '100%',
  },
  moviePoster: {
    height: 300,
    width: '60%',
    backgroundColor: 'red'
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});