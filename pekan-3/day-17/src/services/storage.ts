import AsyncStorage from '@react-native-async-storage/async-storage';

export const simpleStorage = {
  async save(key: string, data: any): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.log('Error save:', error);
      return false;
    }
  },

  async get(key: string): Promise<any> {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.log('Error get:', error);
      return null;
    }
  },

  async remove(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.log('Error remove:', error);
      return false;
    }
  },

  async multiGet(keys: string[]): Promise<{[key: string]: any}> {
    try {
      const values = await AsyncStorage.multiGet(keys);
      const result: {[key: string]: any} = {};
      
      values.forEach(([key, value]) => {
        if (value) {
          try {
            result[key] = JSON.parse(value);
          } catch {
            result[key] = value; // Jika bukan JSON, return as is
          }
        }
      });
      
      return result;
    } catch (error) {
      console.log('❌ Multi-get error:', error);
      return {};
    }
  },

  async multiRemove(keys: string[]): Promise<boolean> {
    try {
      await AsyncStorage.multiRemove(keys);
      console.log('✅ Multi-remove success for keys:', keys);
      return true;
    } catch (error) {
      console.log('❌ Multi-remove error:', error);
      return false;
    }
  },

  async clearAll(): Promise<boolean> {
    try {
      // Hapus semua data kecuali yang diperlukan
      const allKeys = await AsyncStorage.getAllKeys();
      const keysToRemove = allKeys.filter(key => 
        !key.startsWith('@app:') // Jangan hapus app config
      );
      
      await AsyncStorage.multiRemove(keysToRemove);
      console.log('✅ Clear storage success');
      return true;
    } catch (error) {
      console.log('❌ Clear storage error:', error);
      return false;
    }
  }
}