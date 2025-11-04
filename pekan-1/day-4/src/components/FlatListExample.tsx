import React, { useState, useRef, useCallback } from 'react';
import { FlatList, Text, View, StyleSheet, Alert, RefreshControl } from 'react-native';

// ===================================
// 1. DEFINISI TIPE DATA
// ===================================
type ItemType = {
  id: string;
  title: string;
};

// Tipe untuk objek yang diterima oleh onViewableItemsChanged
type ViewableInfo = {
  viewableItems: Array<{ item: ItemType; key: string; index: number | null; isViewable: boolean }>;
  changed: Array<any>; 
};
// ===================================


const DATA: ItemType[] = Array.from({ length: 20 }, (_, i) => ({ id: i.toString(), title: `Item ${i}` }));

const FlatListExample = () => {
  const [refreshing, setRefreshing] = useState(false);
  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: ViewableInfo) => { 
      if (viewableItems.length > 0 && viewableItems[0].item) {
        if (viewableItems[0].isViewable) {
            // Mengubah Alert agar tidak terlalu sering muncul
            // console.log(`Item ${viewableItems[0].item.title} terlihat`);
        }
      }
    }
  ).current;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  // 🛠️ SOLUSI UNTUK getItemLayout: Menggunakan ArrayLike<ItemType>
  const getItemLayout = useCallback(
    (data: ArrayLike<ItemType> | null | undefined, index: number) => ({ // <-- PERBAIKAN DI SINI
      length: 50, 
      offset: 50 * index, 
      index 
    }), 
    []
  );

  const renderItem = ({ item }: { item: ItemType }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={DATA}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      
      // Menggunakan fungsi yang diperbaiki
      getItemLayout={getItemLayout} 
      
      initialNumToRender={10}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      
      ListHeaderComponent={<Text style={styles.header}>Daftar Item</Text>}
      ListFooterComponent={<Text style={styles.footer}>Akhir Daftar</Text>}
    />
  );
};

const styles = StyleSheet.create({
  item: { height: 50, justifyContent: 'center', paddingHorizontal: 16, borderBottomWidth: 1, borderColor: '#ddd' },
  header: { padding: 16, fontWeight: 'bold' },
  footer: { padding: 16, textAlign: 'center', color: 'gray' },
});

export default FlatListExample;