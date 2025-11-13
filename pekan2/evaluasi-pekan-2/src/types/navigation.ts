import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';

// Tipe untuk Drawer Navigator
export type DrawerParamList = {
  MainApp: undefined;
  Profile: { userID?: string };
  Product: undefined;
  Dashboard: undefined;
  Settings: undefined;
};

// Tipe untuk Bottom Tabs Navigator
export type BottomTabParamList = {
  HomeStack: undefined;
  Dashboard: undefined;
  Product: undefined;
  Profile: undefined;
};

// Tipe untuk Home Stack Navigator
export type HomeStackParamList = {
  HomeTabs: { welcomeMessage?: string };
  ProductDetail: { productId: string };
  Checkout: { productId: string };
};

// Tipe untuk Root Stack Navigator - PERBAIKAN: Semua screen harus didefinisikan
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainApp: { 
    userToken?: string;
    userID?: string;
    screen?: keyof RootStackParamList;
    params?: any;
  };
  ProductDetail: { productId: string };
  Checkout: { productId: string };
  Cart: undefined;
  AnalyticsHistory: undefined;
};

// Tipe untuk route parameters
export interface MainAppParams {
  userToken?: string;
  userID?: string;
  screen?: keyof RootStackParamList;
  params?: any;
}

export interface ProfileParams {
  userID?: string;
}

// Route props types untuk useRoute hook
export type ProfileScreenRouteProp = RouteProp<DrawerParamList, 'Profile'>;
export type MainAppScreenRouteProp = RouteProp<RootStackParamList, 'MainApp'>;
export type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

// Navigation prop types
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type ProductDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Extend Native Stack Navigation Prop
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}