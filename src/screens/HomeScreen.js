import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import CountryCard from '../components/atoms/CountryCard';
import SearchBar from '../components/atoms/SearchBar';

export default function HomeScreen({ navigation, favorites, onToggleFavorite }) {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    filterCountries();
  }, [searchText, countries]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      console.error('API Hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCountries = () => {
    const filtered = countries.filter((item) =>
      item.name.common.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handlePress = (country) => {
    navigation.navigate('Details', { country });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <FlatList
        data={filteredCountries}
        keyExtractor={(item) => item.cca3}
        renderItem={({ item }) => (
          <CountryCard
            country={item}
            onPress={() => handlePress(item)}
            isFavorite={favorites.some(fav => fav.cca3 === item.cca3)}
            onFavoriteToggle={() => onToggleFavorite(item)}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aradığınız ülke bulunamadı.</Text>
            <Text style={styles.emptyText}>Belki de böyle bir ülke yoktur :P</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 18, color: 'blue' },
});
