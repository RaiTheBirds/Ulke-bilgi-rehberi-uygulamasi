import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

function CountryDetailScreen(props) {
  console.log('Props:', props);
  const country = props.route?.params?.country || {
    name: { common: 'Test Ülkesi' },
    flags: { png: 'https://restcountries.com/data/usa.svg' },
    capital: ['Test Başkenti'],
    region: 'Test Bölgesi',
    population: 123456,
    languages: { eng: 'English' },
    currencies: { USD: { name: 'US Dollar' } },
    subregion: 'Test Alt Bölge',
  };

  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'Bilinmiyor';

  const currencies = country.currencies
    ? Object.values(country.currencies).map(c => c.name).join(', ')
    : 'Bilinmiyor';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: country.flags.png }} style={styles.flag} />
      <Text style={styles.name}>{country.name.common}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Başkent:</Text>
        <Text style={styles.value}>{country.capital ? country.capital[0] : 'Yok'}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Bölge:</Text>
        <Text style={styles.value}>{country.region}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Nüfus:</Text>
        <Text style={styles.value}>{country.population.toLocaleString()}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Dil(ler):</Text>
        <Text style={styles.value}>{languages}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Para Birimi:</Text>
        <Text style={styles.value}>{currencies}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Alt Alan:</Text>
        <Text style={styles.value}>{country.subregion || 'Yok'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  flag: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1A237E',
  },
  infoBox: {
    width: '100%',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#33691E',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
});
export default CountryDetailScreen;