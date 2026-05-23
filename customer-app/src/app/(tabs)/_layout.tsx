import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { BRAND_COLORS } from '@/constants/brand';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: BRAND_COLORS.indigo,
        tabBarInactiveTintColor: BRAND_COLORS.mutedGrey,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: BRAND_COLORS.borderLight,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIconWrap}>
              <Ionicons name="home" size={size} color={color} />
              <View style={[styles.tabDot, focused && styles.tabDotActive]} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIconWrap}>
              <Ionicons name="receipt" size={size} color={color} />
              <View style={[styles.tabDot, focused && styles.tabDotActive]} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIconWrap}>
              <Ionicons name="person" size={size} color={color} />
              <View style={[styles.tabDot, focused && styles.tabDotActive]} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 4,
    backgroundColor: 'transparent',
  },
  tabDotActive: {
    backgroundColor: BRAND_COLORS.yellow,
  },
});
