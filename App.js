import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import CountryDetailScreen from './src/screens/CountryDetailScreen';
import AboutScreen from './src/screens/AboutScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack({ favorites, onToggleFavorite }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ülkeler Listesi">
        {props => <HomeScreen {...props} favorites={favorites} onToggleFavorite={onToggleFavorite} />}
      </Stack.Screen>
      <Stack.Screen name="Details" component={CountryDetailScreen} options={{ title: 'Detaylar' }} />
    </Stack.Navigator>
  );
}

function FavoritesStack({ favorites, onToggleFavorite }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favoriler Listesi">
        {props => <FavoritesScreen {...props} favorites={favorites} onToggleFavorite={onToggleFavorite} />}
      </Stack.Screen>
      <Stack.Screen name="Details" component={CountryDetailScreen} options={{ title: 'Detaylar' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [favorites, setFavorites] = useState([]);

  const onToggleFavorite = (country) => {
    setFavorites((current) => {
      if (current.find(item => item.cca3 === country.cca3)) {
        return current.filter(item => item.cca3 !== country.cca3);
      } else {
        return [...current, country];
      }
    });
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Ülkeler') iconName = 'globe-outline';
            else if (route.name === 'Favoriler') iconName = 'star-outline';
            else if (route.name === 'Hakkında') iconName = 'information-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Ülkeler" options={{ title: 'Dünya Ülkeleri' , headerShown: false }}>
          {() => <HomeStack favorites={favorites} onToggleFavorite={onToggleFavorite} />}
        </Tab.Screen>
        <Tab.Screen name="Favoriler" options={{title: 'Favorilerim' , headerShown: false }}>
          {() => <FavoritesStack favorites={favorites} onToggleFavorite={onToggleFavorite} />}
        </Tab.Screen>
        <Tab.Screen name="Hakkında" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
