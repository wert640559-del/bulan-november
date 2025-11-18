import { useState, useEffect } from 'react';
import { simpleStorage } from '../services/storage';

export const useSimpleCache = (key: string, fetchData: () => Promise<any>) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);

    // Cek cache dulu
    const cached = await simpleStorage.get(key);
    
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    // Jika tidak ada cache, fetch dari API
    try {
      const freshData = await fetchData();
      setData(freshData);
      
      // Simpan ke cache
      await simpleStorage.save(key, freshData);
    } catch (error) {
      console.log('Error fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    const freshData = await fetchData();
    setData(freshData);
    await simpleStorage.save(key, freshData);
  };

  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, refreshData };
};