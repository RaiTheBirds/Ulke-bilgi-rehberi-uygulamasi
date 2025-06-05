import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function CountryCard({ country, onPress, isFavorite, onFavoriteToggle }) {
  const favIconRef = useRef(null);

  const handleFavorite = () => {
        onFavoriteToggle();
    if (favIconRef.current) {
      favIconRef.current.bounceIn();
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: country.flags.png }} style={styles.flag} />
      <View style={styles.info}>
        <Text style={styles.name}>{country.name.common}</Text>
        <Text style={styles.region}>{country.region}</Text>
      </View>
      <TouchableOpacity onPress={handleFavorite} style={styles.favoriteIcon}>
        <Animatable.View ref={favIconRef} duration={1000} useNativeDriver>
          <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={28} color={isFavorite ? "#E91E63" : "#B0BEC5"} />
        </Animatable.View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 16,
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: '#1565C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  flag: {
    width: 56,
    height: 38,
    resizeMode: 'contain',
    marginRight: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E3F2FD',
    backgroundColor: '#E3F2FD',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 2,
  },
  region: {
    fontSize: 14,
    color: '#78909C',
  },
  favoriteIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
});