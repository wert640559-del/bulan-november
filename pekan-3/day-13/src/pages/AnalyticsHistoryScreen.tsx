// FILE: ./pages/AnalyticsHistoryScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getAnalyticsHistory, clearAnalyticsHistory, addAnalyticsEvent } from '../routes/RootNavigator';

export const AnalyticsHistoryScreen: React.FC = () => {
  const [analyticsHistory, setAnalyticsHistory] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setAnalyticsHistory(getAnalyticsHistory());
  }, [refresh]);

  const handleClearHistory = () => {
    clearAnalyticsHistory();
    setRefresh(prev => prev + 1);
    addAnalyticsEvent('Analytics history cleared by user');
  };

  const handleRefresh = () => {
    setRefresh(prev => prev + 1);
    addAnalyticsEvent('Analytics history manually refreshed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics History</Text>
      <Text style={styles.subtitle}>Log navigasi pengguna - Real Time Tracking</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleRefresh}>
          <Text style={styles.actionButtonText}>🔄 Refresh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.clearButton]} onPress={handleClearHistory}>
          <Text style={styles.actionButtonText}>🗑️ Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.historyContainer}>
        {analyticsHistory.length === 0 ? (
          <Text style={styles.emptyText}>Belum ada data analytics</Text>
        ) : (
          analyticsHistory.map((event, index) => (
            <View key={index} style={styles.eventItem}>
              <Text style={styles.eventText}>{event}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.stats}>
        <Text style={styles.statsText}>
          Total Events: {analyticsHistory.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  historyContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  eventItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  eventText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'monospace',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  stats: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});