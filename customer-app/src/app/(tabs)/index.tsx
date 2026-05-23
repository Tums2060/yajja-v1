import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { BRAND_COLORS } from '@/constants/brand';
import { categories, restaurants } from '@/data/mock';
import { useCart } from '@/context/cart-context';

export default function HomeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(categories[0].key);
  const { addItem, itemCount } = useCart();

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => restaurant.category === activeCategory);
  }, [activeCategory]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const normalized = query.toLowerCase();
    return restaurants.flatMap((restaurant) =>
      restaurant.items
        .filter((item) => item.name.toLowerCase().includes(normalized))
        .map((item) => ({ restaurant, item }))
    );
  }, [query]);

  return (
    <View style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Image
            source={require('@/assets/images/yajja-icon2.jpeg')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Pressable style={styles.cartButton} onPress={() => router.push('/cart')}>
            <Ionicons name="cart" size={20} color={BRAND_COLORS.indigo} />
            {itemCount > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{itemCount}</Text>
              </View>
            ) : null}
          </Pressable>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={BRAND_COLORS.yellow} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search for rice, burger, pizza..."
            placeholderTextColor={BRAND_COLORS.placeholder}
            style={styles.searchInput}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}>
          {categories.map((category) => {
            const isActive = category.key === activeCategory;
            return (
              <Pressable
                key={category.id}
                onPress={() => setActiveCategory(category.key)}
                style={[styles.categoryPill, isActive && styles.categoryPillActive]}>
                <Text
                  style={[
                    styles.categoryText,
                    isActive && styles.categoryTextActive,
                  ]}>
                  {category.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {query.trim() ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            {searchResults.length === 0 ? (
              <Text style={styles.emptySearch}>No items match your search.</Text>
            ) : (
              <View style={styles.cardGrid}>
                {searchResults.map(({ restaurant, item }) => (
                  <View key={`${restaurant.id}-${item.id}`} style={styles.foodCard}>
                    <Image source={{ uri: item.imageUrl }} style={styles.foodImage} />
                    <View style={styles.foodInfo}>
                      <Text style={styles.foodName}>{item.name}</Text>
                      <Text style={styles.foodMeta}>{restaurant.name}</Text>
                      <Text style={styles.foodPrice}>${item.price.toFixed(2)}</Text>
                    </View>
                    <Pressable
                      style={styles.addButton}
                      onPress={() => addItem(restaurant, item)}>
                      <Ionicons name="add" size={18} color={BRAND_COLORS.primaryText} />
                    </Pressable>
                  </View>
                ))}
              </View>
            )}
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, styles.sectionTitleAccent]}>
              Trending Vendors
            </Text>
            <View style={styles.cardGrid}>
              {filteredRestaurants.map((restaurant) => (
                <Pressable
                  key={restaurant.id}
                  style={styles.restaurantCard}
                  onPress={() => router.push(`/restaurant/${restaurant.id}`)}>
                  <Image
                    source={{ uri: restaurant.imageUrl }}
                    style={styles.restaurantImage}
                  />
                  <View style={styles.vendorBadge}>
                    <Text style={styles.vendorBadgeText}>Open</Text>
                  </View>
                  <View style={styles.restaurantContent}>
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    <Text style={styles.restaurantDesc}>{restaurant.description}</Text>
                    <View style={styles.restaurantTag}>
                      <Text style={styles.restaurantTagText}>
                        {categories.find((c) => c.key === restaurant.category)?.label}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        )}
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
    padding: 16,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  logo: {
    width: 180,
    height: 64,
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: BRAND_COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: BRAND_COLORS.yellow,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: BRAND_COLORS.indigo,
    fontSize: 10,
    fontWeight: '700',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: 'rgba(43, 43, 224, 0.3)',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: BRAND_COLORS.textSecondary,
  },
  categoryRow: {
    paddingVertical: 16,
    gap: 10,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: BRAND_COLORS.indigo,
    backgroundColor: 'transparent',
  },
  categoryPillActive: {
    backgroundColor: BRAND_COLORS.yellow,
    borderColor: BRAND_COLORS.yellow,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: BRAND_COLORS.indigo,
  },
  categoryTextActive: {
    color: BRAND_COLORS.indigo,
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: BRAND_COLORS.indigo,
    marginBottom: 12,
  },
  sectionTitleAccent: {
    borderLeftWidth: 4,
    borderLeftColor: BRAND_COLORS.yellow,
    paddingLeft: 10,
  },
  cardGrid: {
    gap: 14,
  },
  restaurantCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BRAND_COLORS.borderLight,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  restaurantImage: {
    width: '100%',
    height: 160,
  },
  vendorBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: BRAND_COLORS.yellow,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  vendorBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: BRAND_COLORS.indigo,
  },
  restaurantContent: {
    padding: 14,
    gap: 6,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '800',
    color: BRAND_COLORS.indigo,
  },
  restaurantDesc: {
    fontSize: 12,
    color: BRAND_COLORS.textSecondary,
  },
  restaurantTag: {
    alignSelf: 'flex-start',
    backgroundColor: BRAND_COLORS.yellow,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  restaurantTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: BRAND_COLORS.indigo,
  },
  foodCard: {
    backgroundColor: BRAND_COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BRAND_COLORS.cardBorder,
    overflow: 'hidden',
  },
  foodImage: {
    width: '100%',
    height: 150,
  },
  foodInfo: {
    padding: 12,
    gap: 4,
  },
  foodName: {
    fontSize: 14,
    fontWeight: '800',
    color: BRAND_COLORS.indigo,
  },
  foodMeta: {
    fontSize: 11,
    color: BRAND_COLORS.textSecondary,
  },
  foodPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: BRAND_COLORS.indigo,
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
  emptySearch: {
    fontSize: 12,
    color: BRAND_COLORS.textSecondary,
  },
});
