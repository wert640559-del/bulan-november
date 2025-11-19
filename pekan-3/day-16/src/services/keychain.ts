import * as Keychain from 'react-native-keychain';

export const saveToken = async (token: string) => {
    try {
        await Keychain.setGenericPassword('user', token, { 
            service: 'com.ecom:userToken' // ✅ PERBAIKI SERVICE NAME
        });
        return true;
    } catch (error) {
        console.error('Error saving token:', error);
        return false;
    }
}

export const getToken = async () => {
    try {
        const credentials = await Keychain.getGenericPassword({ 
            service: 'com.ecom:userToken' // ✅ HARUS SAMA DENGAN saveToken
        });
        return credentials ? credentials.password : null;
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
}

export const removeToken = async () => {
    try {
        await Keychain.resetGenericPassword({ 
            service: 'com.ecom:userToken' // ✅ HARUS SAMA
        });
        return true; // ✅ TAMBAH return true
    } catch (error) {
        console.error('Error removing token:', error);
        return false;
    }
}