import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { getAnalyticsHistory, clearAnalyticsHistory, addAnalyticsEvent } from '../../App'; // ✅ PERBAIKI IMPORT

export const AnalyticsScreen: React.FC = () => {
  const [analytics, setAnalytics] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setAnalytics(getAnalyticsHistory());
  }, [refresh]);

  const handleClearAnalytics = () => {
    clearAnalyticsHistory(); // ✅ GUNAKAN clearAnalyticsHistory
    setRefresh(prev => prev + 1);
    addAnalyticsEvent('Analytics history cleared');
  };

  const handleRefresh = () => {
    setRefresh(prev => prev + 1);
    addAnalyticsEvent('Analytics manually refreshed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics History</Text>
      <Text style={styles.subtitle}>Log navigasi dan event aplikasi</Text>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={handleRefresh}>
          <Text style={styles.buttonText}>🔄 Refresh</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClearAnalytics}>
          <Text style={styles.buttonText}>🗑️ Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Analytics List */}
      <ScrollView style={styles.list}>
        {analytics.length === 0 ? (
          <Text style={styles.emptyText}>Belum ada data analytics</Text>
        ) : (
          analytics.map((event, index) => (
            <View key={index} style={styles.eventItem}>
              <Text style={styles.eventText}>{event}</Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Stats */}
      <View style={styles.stats}>
        <Text style={styles.statsText}>
          Total Events: {analytics.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  eventItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  eventText: {
    fontSize: 12,
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