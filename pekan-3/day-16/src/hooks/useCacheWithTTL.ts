import { useEffect, useState } from "react"
import { simpleStorage } from "../services/storage"

export const useCacheWithTTL = (key: string, fetchData: () => Promise<any>) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    const TTL = 30 * 60 * 1000 // buat  menjadi 30 menit

    const loadData = async() => {
        setLoading(true)

        try {
            const cached = await simpleStorage.get(key)

            if (cached && cached.timestamp) {
                const isExpired = Date.now() - cached.timestamp > TTL;
                if (!isExpired) {
                    console.log('menggunakan cache data (fresh)')
                    setData(cached.data);
                    setLoading(false);
                    return;
                } else {
                    console.log('cache sudah kadaluarsa, memuat data baru')
                }

                console.log('menggunakan cache data')
                setData(cached.data)
                setLoading(false)
                return;
            } else {
                console.log('cache sudah kadaluarsa, memuat data baru')
            }

            const freshData = await fetchData();
            setData(freshData)

            await simpleStorage.save(key, {
                data: freshData,
                timestamp: Date.now()
            })
        } catch (error) {
            console.log(error)

            const cached = await simpleStorage.get(key);
            if (cached && cached.data) {
                console.log('Offline mode, menggunakan cache data')
                setData(cached.data)
            }
        } finally {
            setLoading(false)
        }
    }

    const refreshData = async() => {
        const freshData = await fetchData();
        setData(freshData)
        await simpleStorage.save(key, {
            data: freshData, 
            timestamp: Date.now()
        })
    }

    useEffect(() => {
        loadData()
    }, [])

    return {
        data, 
        loading, 
        refreshData
    }

}