import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

// Functions to interact with MMKV
export const setItem = (key, value) => storage.set(key, JSON.stringify(value));
export const getItem = (key) => {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : null;
};
export const removeItem = (key) => storage.delete(key);
export const clearStorage = () => storage.clearAll();