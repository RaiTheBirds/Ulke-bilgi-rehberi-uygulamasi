import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function FavoritesScreen({
  navigation,
  favorites,
  visited = [],
  wantToVisit = [],
  noPlan = [],
  onToggleFavorite,
  onSetVisitStatus
}) {
  const [activeList, setActiveList] = useState('favorites');

  let data = [];
  let title = '';
  let iconName = '';
  let removeAction = () => {};

  if (activeList === 'favorites') {
    data = favorites;
    title = 'Favorilerim';
    iconName = 'favorite';
    removeAction = onToggleFavorite;
  } else if (activeList === 'visited') {
    data = visited;
    title = 'Ziyaret Ettiklerim';
    iconName = 'check-circle';
    removeAction = (country) => onSetVisitStatus('visited', country);
  } else if (activeList === 'wantToVisit') {
    data = wantToVisit;
    title = 'Ziyaret Etmek İstediklerim';
    iconName = 'star-border';
    removeAction = (country) => onSetVisitStatus('wantToVisit', country);
  } else if (activeList === 'noPlan') {
    data = noPlan;
    title = 'Planım Yok';
    iconName = 'block';
    removeAction = (country) => onSetVisitStatus('noPlan', country);
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabButton, activeList === 'favorites' && styles.activeTab]}
          onPress={() => setActiveList('favorites')}
        >
          <Text style={[styles.tabText, activeList === 'favorites' && styles.activeTabText]}>Favoriler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeList === 'visited' && styles.activeTab]}
          onPress={() => setActiveList('visited')}
        >
          <Text style={[styles.tabText, activeList === 'visited' && styles.activeTabText]}>Ziyaret Ettim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeList === 'wantToVisit' && styles.activeTab]}
          onPress={() => setActiveList('wantToVisit')}
        >
          <Text style={[styles.tabText, activeList === 'wantToVisit' && styles.activeTabText]}>Ziyaret Edeceğim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeList === 'noPlan' && styles.activeTab]}
          onPress={() => setActiveList('noPlan')}
        >
          <Text style={[styles.tabText, activeList === 'noPlan' && styles.activeTabText]}>Planım Yok</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.cca3}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('Details', { country: item })}
              activeOpacity={0.8}
            >
              <Image source={{ uri: item.flags?.png }} style={styles.flag} />
              <View style={{ flex: 1 }}>
                <Text style={styles.itemText}>{item.name.common}</Text>
                <Text style={styles.regionText}>{item.region}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeAction(item)} style={styles.iconButton}>
              <MaterialIcons name={iconName} size={26} color="#E91E63" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <MaterialIcons name="info-outline" size={40} color="#B0BEC5" />
            <Text style={styles.empty}>Liste boş</Text>
          </View>
        }
        contentContainerStyle={data.length === 0 && { flex: 1, justifyContent: 'center' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 15,
    padding: 6,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    marginHorizontal: 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#BBDEFB',
    minWidth: 80,
  },
  activeTab: {
    backgroundColor: '#1E88E5',
    borderColor: '#1E88E5',
    shadowOpacity: 0.2,
  },
  tabText: {
    fontSize: 15,
    color: '#1E88E5',
    fontWeight: '600',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1565C0',
    letterSpacing: 0.5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 14,
    padding: 14,
    shadowColor: '#0D47A1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    width: 50,
    height: 34,
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1565C0',
    textAlign: 'center',
  },
  regionText: {
    fontSize: 14,
    color: '#607D8B',
    marginTop: 2,
    textAlign: 'center',
  },
  iconButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FAFAFA',
    marginLeft: 10,
    elevation: 2,
    shadowColor: '#B0BEC5',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 80,
  },
  empty: {
    textAlign: 'center',
    color: '#B0BEC5',
    marginTop: 12,
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});