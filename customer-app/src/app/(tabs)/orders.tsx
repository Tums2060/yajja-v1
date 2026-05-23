import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { BRAND_COLORS } from '@/constants/brand';
import { useCart } from '@/context/cart-context';

export default function OrdersScreen() {
  const { orders } = useCart();

  return (
    <View style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your Orders</Text>
        {orders.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No orders yet.</Text>
            <Text style={styles.emptySubtitle}>
              Confirm an order to see it listed here.
            </Text>
          </View>
        ) : (
          <View style={styles.orderList}>
            {orders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderCode}>{order.code}</Text>
                  <Text style={styles.orderStatus}>{order.status}</Text>
                </View>
                <View style={styles.orderBody}>
                  {order.items.map((item) => (
                    <View key={`${order.id}-${item.key}`} style={styles.orderItem}>
                      <Text style={styles.orderItemName}>
                        {item.quantity}x {item.name}
                      </Text>
                      <Text style={styles.orderItemMeta}>{item.restaurantName}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.orderTotal}>Total: ${order.total.toFixed(2)}</Text>
              </View>
            ))}
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
    padding: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: BRAND_COLORS.textPrimary,
    marginBottom: 16,
  },
  emptyState: {
    marginTop: 48,
    alignItems: 'center',
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
  orderList: {
    gap: 14,
  },
  orderCard: {
    backgroundColor: BRAND_COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BRAND_COLORS.cardBorder,
    padding: 14,
    gap: 8,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderCode: {
    fontSize: 14,
    fontWeight: '700',
    color: BRAND_COLORS.textPrimary,
  },
  orderStatus: {
    fontSize: 11,
    color: BRAND_COLORS.primaryText,
    fontWeight: '600',
  },
  orderBody: {
    gap: 6,
  },
  orderItem: {
    gap: 2,
  },
  orderItemName: {
    fontSize: 12,
    color: BRAND_COLORS.textPrimary,
  },
  orderItemMeta: {
    fontSize: 11,
    color: BRAND_COLORS.textSecondary,
  },
  orderTotal: {
    fontSize: 12,
    fontWeight: '700',
    color: BRAND_COLORS.primaryText,
  },
});
