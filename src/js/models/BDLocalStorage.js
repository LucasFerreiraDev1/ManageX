export class BDLocalStorage {
    
    constructor(key) {
        this.key = key
    }

    getLocalStorage() {
        return JSON.parse(localStorage.getItem(this.key) || '[]');
    }
    setLocalStorage(value) {
        localStorage.setItem(this.key, JSON.stringify(value));
    }
    

    getSession() {
        return JSON.parse(localStorage.getItem(this.key) || '[]');
    } 
    setSession(value) {
        localStorage.setItem(this.key, JSON.stringify(value));
    }
    deleteSession() {
        localStorage.removeItem(this.key);
    }
}