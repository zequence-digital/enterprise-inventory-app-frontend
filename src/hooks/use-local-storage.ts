import { useState } from 'react';

import {
    getFromLocalStorage,
    removeFromLocalStorage,
    setToLocalStorage,
} from '@/helpers';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        const item = getFromLocalStorage(key);

        return item ? JSON.parse(item) : initialValue;
    });

    const setValue = (value: T | ((val: T) => T)) => {
        const valueToStore =
            value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);
        setToLocalStorage(key, JSON.stringify(valueToStore));
    };

    const removeValue = () => {
        setStoredValue(initialValue);
        removeFromLocalStorage(key);
    };

    return { storedValue, setValue, removeValue };
};
