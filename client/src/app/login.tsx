import React, { useState } from 'react';
import { Link } from 'expo-router';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

const COLORS = {
  background: '#FBF6EF',
  cardBorder: '#E6D7C6',
  cardShadow: '#EADFCF',
  inputBorder: '#D8C4AE',
  textPrimary: '#2D221A',
  textSecondary: '#6E5A49',
  placeholder: '#9C8673',
  primary: '#F2AA00',
  primaryText: '#6B4700',
  link: '#6B4700',
};

export default function Login() {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width - 48, 420);
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundLayer} pointerEvents="none">
        <Image
          source={require('@/assets/images/food-background.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.backgroundOverlay} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { width: cardWidth }]}>
          <Image
            source={require('@/assets/images/yajja-icon2.jpeg')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in to continue.</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="example@gmail.com"
              placeholderTextColor={COLORS.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLORS.placeholder}
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>LOG IN</Text>
          </View>

          <Text style={styles.footerText}>
            Do not have an account?{' '}
            <Link href="/signup" asChild>
              <Text style={styles.footerLink}>Sign up</Text>
            </Link>
          </Text>

          <Text style={styles.brandFooter}>YAJJA CURATED</Text>
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
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 0.18,
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.background,
    opacity: 0.45,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  card: {
    backgroundColor: '#FFF7EF',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 22,
    alignItems: 'center',
    shadowColor: COLORS.cardShadow,
    shadowOpacity: 0.5,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
    gap: 10,
  },
  logo: {
    width: 64,
    height: 64,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  fieldGroup: {
    width: '100%',
    gap: 6,
    marginTop: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 24,
    paddingVertical: 11,
    paddingHorizontal: 16,
    fontSize: 13,
    color: COLORS.textPrimary,
    backgroundColor: '#FFFDFB',
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    marginTop: 14,
  },
  primaryButtonText: {
    color: COLORS.primaryText,
    fontWeight: '700',
    letterSpacing: 1,
    fontSize: 12,
  },
  footerText: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  footerLink: {
    color: COLORS.link,
    fontWeight: '700',
  },
  brandFooter: {
    marginTop: 10,
    fontSize: 10,
    letterSpacing: 2,
    color: COLORS.placeholder,
  },
});
