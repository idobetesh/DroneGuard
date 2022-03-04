import AsyncStorage from '@react-native-async-storage/async-storage';

const getConfig = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

const saveToStore = async (key, val) => {
    const value = typeof val === 'object' ? JSON.stringify(val) : val;
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error(error);
    }
};

const getFromStore = async (key) => {
    let result;
    try {
        result = await AsyncStorage.getItem(key)
        if (!result) {
            throw new Error(`no value was found for '${key}' key`);
        }
    } catch (error) {
        console.error(error);
    }

    return result != null ? JSON.parse(result) : null;
};

const clearStore = async () => {
    try {
        await AsyncStorage.clear()
    } catch (error) {
        console.error(error);
    }
};

const DroneGuardUtils = { saveToStore, getFromStore, clearStore, getConfig };
export default DroneGuardUtils;
