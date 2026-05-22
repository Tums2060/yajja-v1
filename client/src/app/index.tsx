import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const COLORS = {
  background: '#FBF6EF',
  cardBorder: '#E6D7C6',
  cardShadow: '#EADFCF',
  primary: '#F2AA00',
  primaryText: '#6B4700',
  secondaryBorder: '#4B5B96',
  secondaryText: '#4B5B96',
  guestText: '#4B5B96',
  tagline: '#7A5A2A',
};

export default function Home() {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width - 48, 420);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { width: cardWidth }]}>
          <Image
            source={require('@/assets/images/yajja-icon1.jpeg')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>Hot food, fast.</Text>
        </View>

        <View style={[styles.actions, { width: cardWidth }]}>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>SIGN UP</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>LOG IN</Text>
          </Pressable>
          <Pressable style={styles.guestButton}>
            <Text style={styles.guestButtonText}>CONTINUE AS GUEST</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 28,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: COLORS.cardShadow,
    shadowOpacity: 0.6,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  logo: {
    width: 170,
    height: 170,
  },
  tagline: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.tagline,
  },
  actions: {
    alignItems: 'center',
    gap: 14,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: COLORS.primaryText,
    fontWeight: '700',
    letterSpacing: 1.4,
    fontSize: 12,
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 13,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: COLORS.secondaryBorder,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.secondaryText,
    fontWeight: '700',
    letterSpacing: 1.4,
    fontSize: 12,
  },
  guestButton: {
    paddingVertical: 6,
  },
  guestButtonText: {
    color: COLORS.guestText,
    fontWeight: '700',
    letterSpacing: 1.2,
    fontSize: 11,
  },
});