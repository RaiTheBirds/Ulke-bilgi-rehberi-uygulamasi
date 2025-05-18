import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({ searchText, setSearchText }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#1565C0" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Ülke ara..."
        placeholderTextColor="#78909C"
        value={searchText}
        onChangeText={setSearchText}
        autoCorrect={false}
        autoCapitalize="words"
        clearButtonMode="while-editing"
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#1565C0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1565C0',
    paddingVertical: 0,
  },
});
