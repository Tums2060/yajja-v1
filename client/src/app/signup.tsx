import React, { useMemo, useState } from 'react';
import { Link, useRouter } from 'expo-router';
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { postJson } from '@/utils/api';

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

async function storeAuthToken(token: string) {
  if (Platform.OS === 'web') {
    try {
      window.localStorage.setItem('auth_token', token);
    } catch {
      // Ignore storage failures in private mode or restricted contexts.
    }
    return;
  }

  const setItem = SecureStore.setItemAsync;
  if (typeof setItem === 'function') {
    await setItem('auth_token', token);
  }
}

export default function SignUp() {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width - 48, 420);
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mismatch = useMemo(() => {
    if (!confirmPassword) return false;
    return password !== confirmPassword;
  }, [password, confirmPassword]);

  async function handleSubmit() {
    if (isSubmitting || mismatch) return;
    if (!email || !phone || !password) {
      setErrorMessage('Email, phone, and password are required.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const response = await postJson<{ token?: string; message?: string }>(
        '/auth/signup',
        {
          name: name || undefined,
          email,
          phone,
          password,
        }
      );

      if (!response.ok) {
        setErrorMessage(response.error || 'Sign up failed.');
        return;
      }

      if (response.data?.token) {
        await storeAuthToken(response.data.token);
      }
      router.replace('/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  }

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

          <Text style={styles.title}>Join Yajja</Text>
          <Text style={styles.subtitle}>Start your culinary journey today.</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor={COLORS.placeholder}
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="example@gmail.com"
              placeholderTextColor={COLORS.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.placeholder}
              keyboardType="phone-pad"
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Create a password"
              placeholderTextColor={COLORS.placeholder}
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              placeholder="Re-enter your password"
              placeholderTextColor={COLORS.placeholder}
              secureTextEntry
              style={[styles.input, mismatch && styles.inputError]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {mismatch ? (
              <Text style={styles.errorText}>Passwords do not match.</Text>
            ) : null}
          </View>

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <Pressable
            style={[
              styles.primaryButton,
              (isSubmitting || mismatch) && styles.primaryButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting || mismatch}>
            <Text style={styles.primaryButtonText}>
              {isSubmitting ? 'CREATING...' : 'CREATE ACCOUNT'}
            </Text>
          </Pressable>

          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Link href="/login" asChild>
              <Text style={styles.footerLink}>Log in</Text>
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
  inputError: {
    borderColor: '#C4634D',
  },
  errorText: {
    color: '#C4634D',
    fontSize: 11,
    marginTop: 2,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    marginTop: 14,
  },
  primaryButtonDisabled: {
    opacity: 0.6,
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
