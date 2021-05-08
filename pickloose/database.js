export class DataBase {

    constructor(name, version = 3) {
        this.name = name;
        this.version = version;
    }

    open(tables = new Array(), key = 'id') {
        return new Promise((resolve, reject) => {
            let base = indexedDB.open(this.name, this.version);
            base.addEventListener("upgradeneeded", (e) => {
                let database = e.target.result;
                let stores = database.objectStoreNames;
                tables.forEach((table) => {
                    if (!stores.contains(table)) {
                        let objectStore = database.createObjectStore(table, { keyPath: key });
                        objectStore.createIndex("time", "time", { unique: false });
                    }
                })
            })
            base.addEventListener("success", (e) => {
                resolve(e.target.result);
            })
            base.addEventListener("error", (e) => {
                reject(e.target.error);
            })
        });
    }

    static openStore(db, storeName, mode) {
        return new Promise((resolve) => {
            let objectStore = db.transaction(storeName, mode)
                .objectStore(storeName);
            resolve(objectStore);
        })
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
            })

    }
}