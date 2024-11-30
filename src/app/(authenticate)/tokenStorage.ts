import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token:string) => {
  try {
    await AsyncStorage.setItem('jwt', token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('jwt');
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem('jwt');
  } catch (error) {
    console.error('Error clearing token:', error);
  }
};
