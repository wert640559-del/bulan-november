import * as Keychain from 'react-native-keychain';
import { simpleStorage } from './storage';

export const saveToken = async (token: string) => {
    try {
        await Keychain.setGenericPassword('user', token, { 
            service: 'com.ecom:userToken'
        });
        
        // Simpan expiredAt di AsyncStorage (simulasi 1 jam dari sekarang)
        const expiredAt = Date.now() + (60 * 60 * 1000); // 1 jam
        await simpleStorage.save('@token_expired', expiredAt.toString());
        
        return true;
    } catch (error) {
        console.error('Error saving token:', error);
        return false;
    }
}

export const getToken = async () => {
    try {
        // Cek expiredAt dulu
        const expiredAt = await simpleStorage.get('@token_expired');
        if (expiredAt && Date.now() > parseInt(expiredAt)) {
            console.log('❌ Token expired, removing...');
            await removeToken();
            return null;
        }

        const credentials = await Keychain.getGenericPassword({ 
            service: 'com.ecom:userToken'
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
            service: 'com.ecom:userToken'
        });
        await simpleStorage.remove('@token_expired');
        return true;
    } catch (error) {
        console.error('Error removing token:', error);
        return false;
    }
}