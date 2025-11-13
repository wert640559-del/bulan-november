import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';

export const useDrawerGesture = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    // Dapatkan nama route saat ini
    const currentRouteName = route.name;
    
    // Tentukan screen mana yang harus menonaktifkan swipe gesture
    const disableSwipeScreens = ['ProductDetail', 'Checkout'];
    const shouldDisableSwipe = disableSwipeScreens.includes(currentRouteName);

    // Update options berdasarkan route
    navigation.setOptions({
      swipeEnabled: !shouldDisableSwipe,
    });
  }, [navigation, route.name]);
};