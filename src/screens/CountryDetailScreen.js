import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
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
      <View style={styles.card}>
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
            <MaterialIcons name="check-circle" size={22} color={isVisited ? "#fff" : "#388E3C"} />
            <Text style={[styles.buttonText, isVisited && styles.selectedButtonText]}>Ziyaret Ettim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.visitButton,
              isWantToVisit && styles.selectedButton,
            ]}
            onPress={() => onSetVisitStatus('wantToVisit', country)}
          >
            <MaterialIcons name="star-border" size={22} color={isWantToVisit ? "#fff" : "#1976D2"} />
            <Text style={[styles.buttonText, isWantToVisit && styles.selectedButtonText]}>Ziyaret Edeceğim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.visitButton,
              isNoPlan && styles.selectedButton,
            ]}
            onPress={() => onSetVisitStatus('noPlan', country)}
          >
            <MaterialIcons name="block" size={22} color={isNoPlan ? "#fff" : "#D32F2F"} />
            <Text style={[styles.buttonText, isNoPlan && styles.selectedButtonText]}>Planım Yok</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.visitButton,
              isFavorite && styles.selectedButton,
            ]}
            onPress={() => onToggleFavorite(country)}
          >
            <MaterialIcons name={isFavorite ? "favorite" : "favorite-border"} size={22} color={isFavorite ? "#fff" : "#E91E63"} />
            <Text style={[styles.buttonText, isFavorite && styles.selectedButtonText]}>{isFavorite ? "Favorilerde" : "Favorilere Ekle"}</Text>
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
          <Ionicons name="business" size={20} color="#1976D2" style={styles.infoIcon} />
          <Text style={styles.label}>Başkent:</Text>
          <Text style={styles.value}>{country.capital ? country.capital[0] : 'Yok'}</Text>
        </View>
        <View style={styles.infoBox}>
          <FontAwesome5 name="globe-europe" size={18} color="#388E3C" style={styles.infoIcon} />
          <Text style={styles.label}>Bölge:</Text>
          <Text style={styles.value}>{country.region}</Text>
        </View>
        <View style={styles.infoBox}>
          <MaterialIcons name="people" size={20} color="#D32F2F" style={styles.infoIcon} />
          <Text style={styles.label}>Nüfus:</Text>
          <Text style={styles.value}>{country.population.toLocaleString()}</Text>
        </View>
        <View style={styles.infoBox}>
          <Ionicons name="language" size={20} color="#1976D2" style={styles.infoIcon} />
          <Text style={styles.label}>Dil(ler):</Text>
          <Text style={styles.value}>{languages}</Text>
        </View>
        <View style={styles.infoBox}>
          <MaterialIcons name="attach-money" size={22} color="#388E3C" style={styles.infoIcon} />
          <Text style={styles.label}>Para Birimi:</Text>
          <Text style={styles.value}>{currencies}</Text>
        </View>
        <View style={styles.infoBox}>
          <MaterialIcons name="map" size={20} color="#1976D2" style={styles.infoIcon} />
          <Text style={styles.label}>Alt Alan:</Text>
          <Text style={styles.value}>{country.subregion || 'Yok'}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#1565C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 24,
  },
  flag: {
    width: 180,
    height: 110,
    resizeMode: 'contain',
    marginBottom: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E3F2FD',
    backgroundColor: '#E3F2FD',
  },
  map: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 18,
    marginTop: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#1A237E',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
    gap: 8,
  },
  visitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F8E9',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginHorizontal: 4,
    marginVertical: 4,
    minWidth: 140,
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#1976D2',
  },
  buttonText: {
    marginLeft: 7,
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  selectedButtonText: {
    color: '#fff',
  },
  statusText: {
    fontSize: 16,
    color: '#1976D2',
    marginBottom: 12,
    textAlign: '',
    marginTop: 4,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    padding: 12,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    shadowColor: '#B0BEC5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  infoIcon: {
    marginRight: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#33691E',
    marginRight: 6,
  },
  value: {
    fontSize: 15,
    color: '#333',
    flexShrink: 1,
  },
});
export default CountryDetailScreen;