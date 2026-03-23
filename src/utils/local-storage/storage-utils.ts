export function saveToLocalStorage<T>(key: string, data: T): void {
    try {

        if (data === undefined) {
            console.warn(`saveToLocalStorage: trying to save 'undefined' to localStorage key: ${key}`);
            return;
        }

        const serialized = JSON.stringify(data);

        localStorage.setItem(key, serialized);
    } catch (error) {
        console.error(`saveToLocalStorage: failed to serialize or save data to localStorage (key: ${key})`, error);
    }
}

export function loadFromLocalStorage<T>(key: string): T | null {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`loadFromLocalStorage: failed to read from localStorage (key: ${key})`, error);
        return null;
    }
}

export function removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
}
