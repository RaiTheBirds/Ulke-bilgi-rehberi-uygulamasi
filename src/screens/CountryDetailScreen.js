import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';

function CountryDetailScreen({
  route,
  isFavorite,
  visited = [],
  wantToVisit = [],
  noPlan = [],
  onToggleFavorite,
  onSetVisitStatus,
}) {
  const country = route?.params?.country || {
    name: { common: 'Test Ülkesi' },
    flags: { png: 'https://restcountries.com/data/usa.svg' },
    capital: ['Test Başkenti'],
    region: 'Test Bölgesi',
    population: 123456,
    languages: { eng: 'English' },
    currencies: { USD: { name: 'US Dollar' } },
    subregion: 'Test Alt Bölge',
    latlng: [39.0, -95.0],
  };

  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'Bilinmiyor';

  const currencies = country.currencies
    ? Object.values(country.currencies).map(c => c.name).join(', ')
    : 'Bilinmiyor';

  const isVisited = visited.some(c => c.cca3 === country.cca3);
  const isWantToVisit = wantToVisit.some(c => c.cca3 === country.cca3);
  const isNoPlan = noPlan.some(c => c.cca3 === country.cca3);

  const hasLatLng = country.latlng && country.latlng.length === 2;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: country.flags.png }} style={styles.flag} />
      <Text style={styles.name}>{country.name.common}</Text>
      {hasLatLng && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: country.latlng[0],
            longitude: country.latlng[1],
            latitudeDelta: 10,
            longitudeDelta: 10,
          }}
        >
          <Marker
            coordinate={{
              latitude: country.latlng[0],
              longitude: country.latlng[1],
            }}
            title={country.name.common}
          />
        </MapView>
      )}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.visitButton,
            isVisited && styles.selectedButton,
          ]}
          onPress={() => onSetVisitStatus('visited', country)}
        >
          <MaterialIcons name="check-circle" size={24} color="#388E3C" />
          <Text style={styles.buttonText}>Ziyaret Ettim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.visitButton,
            isWantToVisit && styles.selectedButton,
          ]}
          onPress={() => onSetVisitStatus('wantToVisit', country)}
        >
          <MaterialIcons name="star-border" size={24} color="#1976D2" />
          <Text style={styles.buttonText}>Ziyaret Edeceğim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.visitButton,
            isNoPlan && styles.selectedButton,
          ]}
          onPress={() => onSetVisitStatus('noPlan', country)}
        >
          <MaterialIcons name="block" size={24} color="#D32F2F" />
          <Text style={styles.buttonText}>Planım Yok</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.visitButton,
            isFavorite && styles.selectedButton,
          ]}
          onPress={() => onToggleFavorite(country)}
        >
          <MaterialIcons name={isFavorite ? "favorite" : "favorite-border"} size={24} color="#E91E63" />
          <Text style={styles.buttonText}>{isFavorite ? "Favorilerde" : "Favorilere Ekle"}</Text>
        </TouchableOpacity>
      </View>
      {(isVisited || isWantToVisit || isNoPlan || isFavorite) && (
        <Text style={styles.statusText}>
          {isVisited ? 'Bu ülkeyi ziyaret ettiniz.\n' : ''}
          {isWantToVisit ? 'Bu ülkeyi ziyaret etmek istiyorsunuz.\n' : ''}
          {isNoPlan ? 'Bu ülke için planınız yok.\n' : ''}
          {isFavorite ? 'Bu ülke favorilerinizde.' : ''}
        </Text>
      )}

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
  map: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1A237E',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 16,
  },
  visitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F8E9',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  selectedButton: {
    backgroundColor: '#C8E6C9',
    borderWidth: 1,
    borderColor: '#388E3C',
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  statusText: {
    fontSize: 16,
    color: '#1976D2',
    marginBottom: 12,
    textAlign: 'center',
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