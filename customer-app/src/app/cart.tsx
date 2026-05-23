import React from 'react';
import {
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
import { useCart } from '@/context/cart-context';

export default function CartScreen() {
  const router = useRouter();
  const {
    items,
    total,
    updateInstructions,
    updateQuantity,
    removeItem,
    confirmOrder,
  } = useCart();

  const handleConfirm = () => {
    const order = confirmOrder();
    if (order) {
      router.replace('/(tabs)/orders');
    }
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.headerRow}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color={BRAND_COLORS.primaryText} />
        </Pressable>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Your cart is empty.</Text>
            <Text style={styles.emptySubtitle}>Add items to start an order.</Text>
          </View>
        ) : (
          <View style={styles.itemList}>
            {items.map((item) => (
              <View key={item.key} style={styles.cartCard}>
                <View style={styles.cartHeader}>
                  <View>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemMeta}>{item.restaurantName}</Text>
                  </View>
                  <Pressable onPress={() => removeItem(item.key)}>
                    <Ionicons name="close" size={18} color={BRAND_COLORS.textSecondary} />
                  </Pressable>
                </View>
                <View style={styles.quantityRow}>
                  <Pressable
                    style={styles.qtyButton}
                    onPress={() => updateQuantity(item.key, -1)}>
                    <Ionicons name="remove" size={16} color={BRAND_COLORS.primaryText} />
                  </Pressable>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <Pressable
                    style={styles.qtyButton}
                    onPress={() => updateQuantity(item.key, 1)}>
                    <Ionicons name="add" size={16} color={BRAND_COLORS.primaryText} />
                  </Pressable>
                  <Text style={styles.itemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
                <TextInput
                  value={item.instructions}
                  onChangeText={(value) => updateInstructions(item.key, value)}
                  placeholder="Add instructions (e.g. no onions)"
                  placeholderTextColor={BRAND_COLORS.placeholder}
                  style={styles.instructionsInput}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
        <Pressable
          style={[styles.confirmButton, items.length === 0 && styles.disabledButton]}
          onPress={handleConfirm}
          disabled={items.length === 0}>
          <Text style={styles.confirmText}>Confirm Order</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BRAND_COLORS.background,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: BRAND_COLORS.textPrimary,
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.textPrimary,
  },
  emptySubtitle: {
    fontSize: 12,
    color: BRAND_COLORS.textSecondary,
  },
  itemList: {
    gap: 14,
  },
  cartCard: {
    backgroundColor: BRAND_COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BRAND_COLORS.cardBorder,
    padding: 14,
    gap: 10,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: BRAND_COLORS.textPrimary,
  },
  itemMeta: {
    fontSize: 11,
    color: BRAND_COLORS.textSecondary,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: BRAND_COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '700',
    color: BRAND_COLORS.textPrimary,
    minWidth: 18,
    textAlign: 'center',
  },
  itemPrice: {
    marginLeft: 'auto',
    fontSize: 13,
    fontWeight: '700',
    color: BRAND_COLORS.primaryText,
  },
  instructionsInput: {
    borderWidth: 1,
    borderColor: BRAND_COLORS.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 12,
    color: BRAND_COLORS.textPrimary,
    backgroundColor: BRAND_COLORS.surface,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    backgroundColor: BRAND_COLORS.card,
    borderTopWidth: 1,
    borderTopColor: BRAND_COLORS.cardBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  totalLabel: {
    fontSize: 12,
    color: BRAND_COLORS.textSecondary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: BRAND_COLORS.textPrimary,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: BRAND_COLORS.primary,
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmText: {
    color: BRAND_COLORS.primaryText,
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.6,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
