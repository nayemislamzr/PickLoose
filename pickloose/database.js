export class DataBase {

    static saveDataBaseInfo(name, version, store) {
        chrome.storage.local.get(null, (response) => {
            let stores = typeof response.stores === Array ? response.stores : [];
            stores.push(store);
            let dabaseObject = {
                name: name,
                version: version,
                stores: stores
            }
            chrome.storage.local.set(dabaseObject);
        })
    }

    static openStore(db, storeName, mode) {
        return new Promise((resolve) => {
            let objectStore = db.transaction(storeName, mode)
                .objectStore(storeName);
            resolve(objectStore);
        })
    }

    constructor(name, version) {
        this.name = name;
        this.version = version;
    }

    hasThisStore(storeName) {
        return new Promise((resolve) => {
            chrome.storage.local.get(null, (response) => {
                if (response !== undefined && response.stores !== undefined && response.stores.includes(storeName)) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
        })
    }

    open(table = null, key = 'id') {
        return new Promise((resolve, reject) => {
            let base = indexedDB.open(this.name, this.version);

            base.addEventListener("upgradeneeded", (e) => {
                let database = e.target.result;
                let stores = database.objectStoreNames;

                DataBase.saveDataBaseInfo(this.name, this.version, "history");

                if (table !== null && !stores.contains(table)) {
                    let objectStore = database.createObjectStore(table, { keyPath: key });
                    objectStore.createIndex("time", "time", { unique: false });
                    objectStore.createIndex("category", ["category", "time"], { unique: false });
                }
            })
            base.addEventListener("success", (e) => {
                console.log("database successfully opened", e.target.result.version);
                resolve(e.target.result);
            })
            base.addEventListener("error", (e) => {
                console.log(error);
                reject(e.target.error);
            })
        });
    }

    insert(store, data) {

        this.open(store)
            .then(async(db) => {
                let objectStore = await DataBase.openStore(db, store, "readwrite");
                let request = objectStore.add(data);

                request.onsuccess = () => { console.log("POST request successfull"); }
                request.onerror = (e) => { console.log(e.target.error); }

            })
            .catch((error) => {
                console.log(error);
            })

    }


    get(store, key) {
        return new Promise((resolve) => {
            this.open(store)
                .then(async(db) => {
                    let objectStore = await DataBase.openStore(db, store, "readonly");
                    let request = objectStore.get(key);

                    request.onsuccess = () => {
                        console.log("GET request successfull");
                        let data = request.result;
                        if (data !== undefined) {
                            resolve(data);
                        } else {
                            console.log("No data with the given id found");
                        }

                    }

                    request.onerror = (e) => { console.log(e.target.error); }
                })
                .catch((error) => {
                    console.log(error);
                })

        })
    }

    delete(store, key) {
        this.open(store)
            .then(async(db) => {
                let objectStore = await DataBase.openStore(db, store, "readwrite");
                let request = objectStore.delete(key);

                request.onsuccess = () => { console.log("DELETE request successfull"); }
                request.onerror = (e) => { console.log(e.target.error); }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    update(store, data) {
        this.open(store)
            .then(async(db) => {
                let objectStore = await DataBase.openStore(db, store, "readwrite");
                let request = objectStore.put(data);

                request.onsuccess = () => { console.log("UPDATE request successfull"); }
                request.onerror = (e) => { console.log(e.target.error); }
            })
            .catch((error) => {
                console.log(error);
                throw new Error(error);
            })

    }
}