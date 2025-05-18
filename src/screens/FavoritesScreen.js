import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import CountryCard from '../components/atoms/CountryCard';

export default function FavoritesScreen({ navigation, favorites, onToggleFavorite }) {
  const handlePress = (country) => {
    navigation.navigate('Details', { country });
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Daha önce bir ülkeyi favori olarak eklememişsin.</Text>
        <Text style={styles.emptyText}>Türkiye'yi eklemeye ne dersin :P.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.cca3}
        renderItem={({ item }) => (
          <CountryCard
            country={item}
            onPress={() => handlePress(item)}
            isFavorite={true}
            onFavoriteToggle={() => onToggleFavorite(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#888' },
});
