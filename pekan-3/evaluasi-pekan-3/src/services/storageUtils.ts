import { simpleStorage } from './storage';

export const safeJSONParse = (data: string | null): any => {
  if (!data) return null;
  
  try {
    return JSON.parse(data);
  } catch (error) {
    console.log('❌ Corrupted data detected, removing...');
    return null;
  }
};

export const recoverFromCorruption = async (key: string): Promise<any> => {
  try {
    const rawData = await simpleStorage.get(key);
    const parsedData = safeJSONParse(rawData);
    
    if (parsedData === null) {
      console.log(`🔄 Removing corrupted data for key: ${key}`);
      await simpleStorage.remove(key);
      return null;
    }
    
    return parsedData;
  } catch (error) {
    console.log(`❌ Recovery failed for ${key}:`, error);
    await simpleStorage.remove(key);
    return null;
  }
};

// Utility untuk handle semua storage operations dengan safety
export const safeStorage = {
  async get(key: string): Promise<any> {
    return await recoverFromCorruption(key);
  },
  
  async save(key: string, data: any): Promise<boolean> {
    try {
      await simpleStorage.save(key, data);
      return true;
    } catch (error) {
      console.log(`❌ Safe save failed for ${key}:`, error);
      return false;
    }
  }
};