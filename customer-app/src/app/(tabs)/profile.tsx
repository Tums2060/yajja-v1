import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { BRAND_COLORS } from '@/constants/brand';
import { customerProfile } from '@/data/mock';

export default function ProfileScreen() {
  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/yajja-icon2.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.name}>{customerProfile.name}</Text>
        <Text style={styles.detail}>{customerProfile.email}</Text>
        <Text style={styles.detail}>{customerProfile.phone}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Account Details</Text>
        <Text style={styles.infoText}>Member since 2023</Text>
        <Text style={styles.infoText}>Default payment method: Visa •••• 3210</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BRAND_COLORS.background,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  logo: {
    width: 34,
    height: 34,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: BRAND_COLORS.textPrimary,
  },
  card: {
    backgroundColor: BRAND_COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BRAND_COLORS.cardBorder,
    padding: 16,
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.textPrimary,
  },
  detail: {
    fontSize: 12,
    color: BRAND_COLORS.textSecondary,
  },
  infoCard: {
    marginTop: 16,
    backgroundColor: BRAND_COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BRAND_COLORS.cardBorder,
    padding: 16,
    gap: 6,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: BRAND_COLORS.textPrimary,
  },
  infoText: {
    fontSize: 12,
    color: BRAND_COLORS.textSecondary,
  },
});
