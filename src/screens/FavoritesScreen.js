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
        <TouchableOpacity style={[styles.tabButton, activeList === 'favorites' && styles.activeTab]} onPress={() => setActiveList('favorites')}>
          <Text style={styles.tabText}>Favoriler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeList === 'visited' && styles.activeTab]} onPress={() => setActiveList('visited')}>
          <Text style={styles.tabText}>Ziyaret Ettim</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeList === 'wantToVisit' && styles.activeTab]} onPress={() => setActiveList('wantToVisit')}>
          <Text style={styles.tabText}>Ziyaret Edeceğim</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeList === 'noPlan' && styles.activeTab]} onPress={() => setActiveList('noPlan')}>
          <Text style={styles.tabText}>Planım Yok</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{title}</Text>
<FlatList
  data={data}
  keyExtractor={item => item.cca3}
  renderItem={({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
        onPress={() => navigation.navigate('Details', { country: item })}
      >
        <Image source={{ uri: item.flags?.png }} style={styles.flag} />
        <Text style={styles.itemText}>{item.name.common}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeAction(item)} style={styles.iconButton}>
        <MaterialIcons name={iconName} size={24} color="#E91E63" />
      </TouchableOpacity>
    </View>
  )}
  ListEmptyComponent={<Text style={styles.empty}>Liste boş</Text>}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  tabRow: { flexDirection: 'row', marginBottom: 12, justifyContent: 'space-between' },
  tabButton: { flex: 1, padding: 10, alignItems: 'center', borderBottomWidth: 2, borderColor: '#eee' },
  activeTab: { borderColor: '#007AFF' },
  tabText: { fontSize: 15, color: '#333' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  item: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  flag: { width: 40, height: 28, marginRight: 12, borderRadius: 4, backgroundColor: '#eee' },
  itemText: { fontSize: 16, flex: 1 },
  iconButton: { padding: 6 },
  empty: { textAlign: 'center', color: 'gray', marginTop: 30 }
});