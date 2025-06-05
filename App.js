import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import CountryDetailScreen from './src/screens/CountryDetailScreen';
import AboutScreen from './src/screens/AboutScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ContinentsScreen from './src/screens/ContinentsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ContinentsStack = createNativeStackNavigator();

function ContinentsStackScreen({ favorites, onToggleFavorite, visited, wantToVisit, noPlan, onSetVisitStatus }) {
  return (
    <ContinentsStack.Navigator>
      <ContinentsStack.Screen
        name="Kıtalar"
        options={{ title: 'Kıtalar' }}
      >
        {props => (
          <ContinentsScreen
            {...props}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </ContinentsStack.Screen>
      <ContinentsStack.Screen
        name="Details"
        options={{ title: 'Detaylar' }}
      >
        {props => {
          const country = props.route.params.country;
          return (
            <CountryDetailScreen
              {...props}
              isFavorite={favorites.some(fav => fav.cca3 === country.cca3)}
              visited={visited}
              wantToVisit={wantToVisit}
              noPlan={noPlan}
              onToggleFavorite={onToggleFavorite}
              onSetVisitStatus={onSetVisitStatus}
            />
          );
        }}
      </ContinentsStack.Screen>
    </ContinentsStack.Navigator>
  );
}

function HomeStack({ favorites, onToggleFavorite, visited, wantToVisit, noPlan, onSetVisitStatus }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ülkeler Listesi">
        {props => <HomeScreen {...props} favorites={favorites} onToggleFavorite={onToggleFavorite} />}
      </Stack.Screen>
      <Stack.Screen
        name="Details"
        options={{ title: 'Detaylar' }}
      >
        {props => {
          const country = props.route.params.country;
          return (
            <CountryDetailScreen
              {...props}
              isFavorite={favorites.some(fav => fav.cca3 === country.cca3)}
              visited={visited}
              wantToVisit={wantToVisit}
              noPlan={noPlan}
              onToggleFavorite={onToggleFavorite}
              onSetVisitStatus={onSetVisitStatus}
            />
          );
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function FavoritesStack({ favorites, onToggleFavorite, visited, wantToVisit, noPlan, onSetVisitStatus }) {
  return (
    <Stack.Navigator>
<Stack.Screen name="Listelerim">
  {props => (
    <FavoritesScreen
      {...props}
      favorites={favorites}
      visited={visited}
      wantToVisit={wantToVisit}
      noPlan={noPlan}
      onToggleFavorite={onToggleFavorite}
      onSetVisitStatus={onSetVisitStatus}
    />
  )}
</Stack.Screen>
      <Stack.Screen
  name="Details"
  options={{ title: 'Detaylar' }}
>
  {props => {
    const country = props.route.params.country;
    return (
      <CountryDetailScreen
        {...props}
        isFavorite={favorites.some(fav => fav.cca3 === country.cca3)}
        visited={visited}
        wantToVisit={wantToVisit}
        noPlan={noPlan}
        onToggleFavorite={onToggleFavorite}
        onSetVisitStatus={onSetVisitStatus}
      />
    );
  }}
</Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [visited, setVisited] = useState([]);
  const [wantToVisit, setWantToVisit] = useState([]);
  const [noPlan, setNoPlan] = useState([]);

  const onToggleFavorite = (country) => {
    setFavorites((current) =>
      current.find(item => item.cca3 === country.cca3)
        ? current.filter(item => item.cca3 !== country.cca3)
        : [...current, country]
    );
  };

const onSetVisitStatus = (status, country) => {
  if (status === 'visited') {
    setVisited(current =>
      current.find(item => item.cca3 === country.cca3)
        ? current.filter(item => item.cca3 !== country.cca3)
        : [...current, country]
    );
  }
  if (status === 'wantToVisit') {
    setWantToVisit(current =>
      current.find(item => item.cca3 === country.cca3)
        ? current.filter(item => item.cca3 !== country.cca3)
        : [...current, country]
    );
  }
  if (status === 'noPlan') {
    setNoPlan(current =>
      current.find(item => item.cca3 === country.cca3)
        ? current.filter(item => item.cca3 !== country.cca3)
        : [...current, country]
    );
  }
};

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Ülkeler') iconName = 'globe-outline';
            else if (route.name === 'Listelerim') iconName = 'star-outline';
            else if (route.name === 'Kıtalar') iconName = 'earth-outline';
            else if (route.name === 'Hakkında') iconName = 'information-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Ülkeler" options={{ title: 'Ülkeler Listesi', headerShown: false }}>
          {() => (
            <HomeStack
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
              visited={visited}
              wantToVisit={wantToVisit}
              noPlan={noPlan}
              onSetVisitStatus={onSetVisitStatus}
            />
          )}
        </Tab.Screen>
    <Tab.Screen name="Kıtalar" options={{ title: 'Kıtalar', headerShown: false }}>
      {() => (
       <ContinentsStackScreen
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          visited={visited}
          wantToVisit={wantToVisit}
         noPlan={noPlan}
         onSetVisitStatus={onSetVisitStatus}
        />
     )}
</Tab.Screen>
        <Tab.Screen name="Listelerim" options={{ title: 'Listelerim', headerShown: false }}>
          {() => (
            <FavoritesStack
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
              visited={visited}
              wantToVisit={wantToVisit}
              noPlan={noPlan}
              onSetVisitStatus={onSetVisitStatus}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Hakkında" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}