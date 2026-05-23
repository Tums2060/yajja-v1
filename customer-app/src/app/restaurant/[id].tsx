import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { BRAND_COLORS } from '@/constants/brand';
import { categories, restaurants } from '@/data/mock';
import { useCart } from '@/context/cart-context';

export default function RestaurantDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addItem, itemCount } = useCart();
  const restaurant = restaurants.find((entry) => entry.id === id);

  if (!restaurant) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>Restaurant not found.</Text>
      </View>
    );
  }

  const categoryLabel =
    categories.find((category) => category.key === restaurant.category)?.label ||
    restaurant.category;

  return (
    <View style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={20} color={BRAND_COLORS.primaryText} />
          </Pressable>
          <Pressable onPress={() => router.push('/cart')} style={styles.cartButton}>
            <Ionicons name="cart" size={20} color={BRAND_COLORS.primaryText} />
            {itemCount > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{itemCount}</Text>
              </View>
            ) : null}
          </Pressable>
        </View>

        <Image source={{ uri: restaurant.imageUrl }} style={styles.heroImage} />
        <View style={styles.headerContent}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantDesc}>{restaurant.description}</Text>
          <View style={styles.tagRow}>
            <View style={styles.tagPill}>
              <Text style={styles.tagText}>{categoryLabel}</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menu Highlights</Text>
          <View style={styles.menuGrid}>
            {restaurant.items.map((item) => (
              <View key={item.id} style={styles.menuCard}>
                <Image source={{ uri: item.imageUrl }} style={styles.menuImage} />
                <View style={styles.menuInfo}>
                  <Text style={styles.menuName}>{item.name}</Text>
                  <Text style={styles.menuDesc}>{item.description}</Text>
                  <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>
                </View>
                <Pressable
                  style={styles.addButton}
                  onPress={() => addItem(restaurant, item)}>
                  <Ionicons name="add" size={18} color={BRAND_COLORS.primaryText} />
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BRAND_COLORS.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BRAND_COLORS.card,
    borderWidth: 1,
    borderColor: BRAND_COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BRAND_COLORS.card,
    borderWidth: 1,
    borderColor: BRAND_COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: BRAND_COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: BRAND_COLORS.card,
  },
  badgeText: {
    color: BRAND_COLORS.primaryText,
    fontSize: 10,
    fontWeight: '700',
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 18,
  },
  headerContent: {
    marginTop: 16,
    gap: 6,
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: '700',
    color: BRAND_COLORS.textPrimary,
  },
  restaurantDesc: {
    fontSize: 12,
    color: BRAND_COLORS.textSecondary,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  tagPill: {
    backgroundColor: '#F9E7BD',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: BRAND_COLORS.primaryText,
  },
  menuSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.textPrimary,
    marginBottom: 12,
  },
  menuGrid: {
    gap: 14,
  },
  menuCard: {
    backgroundColor: BRAND_COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BRAND_COLORS.cardBorder,
    overflow: 'hidden',
  },
  menuImage: {
    width: '100%',
    height: 160,
  },
  menuInfo: {
    padding: 12,
    gap: 4,
  },
  menuName: {
    fontSize: 14,
    fontWeight: '700',
    color: BRAND_COLORS.textPrimary,
  },
  menuDesc: {
    fontSize: 11,
    color: BRAND_COLORS.textSecondary,
  },
  menuPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: BRAND_COLORS.primaryText,
  },
  addButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: BRAND_COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BRAND_COLORS.background,
  },
  emptyText: {
    fontSize: 14,
    color: BRAND_COLORS.textSecondary,
  },
});
