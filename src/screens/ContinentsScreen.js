import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import CountryCard from '../components/atoms/CountryCard';

const CONTINENTS = [
  { key: 'Africa', label: 'Afrika' },
  { key: 'Americas', label: 'Amerika' },
  { key: 'Asia', label: 'Asya' },
  { key: 'Europe', label: 'Avrupa' },
  { key: 'Oceania', label: 'Okyanusya' },
  { key: 'Antarctic', label: 'Antarktika' },
];

export default function ContinentsScreen({ navigation, favorites = [], onToggleFavorite }) {
  const [countries, setCountries] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('API Hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryPress = (country) => {
    navigation.navigate('Details', { country });
  };

  const filteredCountries = selectedContinent
    ? countries
        .filter(c => c.region === selectedContinent)
        .sort((a, b) => a.name.common.localeCompare(b.name.common, 'tr'))
    : [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F7FA' }}>
      <View style={styles.container}>
        <View style={styles.continentRow}>
          {CONTINENTS.map(cont => (
            <TouchableOpacity
              key={cont.key}
              style={[
                styles.continentButton,
                selectedContinent === cont.key && styles.selectedContinentButton,
              ]}
              onPress={() => setSelectedContinent(cont.key)}
            >
              <Text
                style={[
                  styles.continentButtonText,
                  selectedContinent === cont.key && styles.selectedContinentButtonText,
                ]}
              >
                {cont.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#1976D2" style={{ marginTop: 40 }} />
        ) : selectedContinent ? (
          <FlatList
            data={filteredCountries}
            keyExtractor={item => item.cca3}
            renderItem={({ item }) => (
              <CountryCard
                country={item}
                onPress={() => handleCountryPress(item)}
                isFavorite={favorites.some(fav => fav.cca3 === item.cca3)}
                onFavoriteToggle={() => onToggleFavorite(item)}
              />
            )}
            ListEmptyComponent={
              <Text style={{ textAlign: 'center', marginTop: 30, color: 'gray' }}>
                Bu kıtada ülke bulunamadı.
              </Text>
            }
          />
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 30, color: '#1976D2' }}>
            Bir kıta seçiniz.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F7FA' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', color: '#1976D2' },
  continentRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 16 },
  continentButton: {
    backgroundColor: '#E3F2FD',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    margin: 6,
  },
  selectedContinentButton: {
    backgroundColor: '#1976D2',
  },
  continentButtonText: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 15,
  },
  selectedContinentButtonText: {
    color: '#fff',
  },
});