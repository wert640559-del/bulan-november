import { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

export const useDrawerLock = (onDrawerLockChange?: (locked: boolean) => void) => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const currentRouteName = route.name;
    
    // Lock drawer untuk screens tertentu
    const lockedScreens = ['ProductDetail', 'Checkout'];
    const shouldLock = lockedScreens.includes(currentRouteName);

    console.log(`Drawer locking: ${shouldLock ? 'LOCKED' : 'UNLOCKED'} for ${currentRouteName}`);
    
    // Update drawer lock state
    navigation.getParent()?.setOptions({
      swipeEnabled: !shouldLock,
    });

    // Notify parent component
    if (onDrawerLockChange) {
      onDrawerLockChange(shouldLock);
    }

    // Cleanup saat unmount
    return () => {
      navigation.getParent()?.setOptions({
        swipeEnabled: true,
      });
      if (onDrawerLockChange) {
        onDrawerLockChange(false);
      }
    };
  }, [navigation, route.name, onDrawerLockChange]);
};