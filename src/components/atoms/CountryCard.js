import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CountryCard({ country, onPress, isFavorite, onFavoriteToggle }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: country.flags.png }} style={styles.flag} />
      <View style={styles.info}>
        <Text style={styles.name}>{country.name.common}</Text>
        <Text style={styles.region}>{country.region}</Text>
      </View>
      <TouchableOpacity onPress={onFavoriteToggle} style={styles.favoriteIcon}>
        <Ionicons name={isFavorite ? "star" : "star-outline"} size={24} color="#FFD700" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#F1F8E9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  flag: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  region: {
    fontSize: 14,
    color: '#555',
  },
  favoriteIcon: {
    padding: 8,
  },
});
