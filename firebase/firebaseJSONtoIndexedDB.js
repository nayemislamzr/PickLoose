import { DataBase } from '../pickloose/database.js'
import { DataRequest } from '../pickloose/request.js'
import { getDataBaseVersion } from '../background.js'
import { readTextFile } from './readJSONfromLocal.js'

async function firebaseToIndexedDB(databases) {
    for (let database of Object.keys(databases)) {
        for (let store of Object.keys(databases[database])) {
            let version = await getDataBaseVersion();
            let IndexedDBdatabase = new DataBase(database, version);
            for (let video of Object.keys(databases[database][store])) {
                let videoInfo = databases[database][store][video];
                let data = await new DataRequest(`https://www.youtube.com/watch?v=${videoInfo.id}`)
                    .doFetch(videoInfo.time);
                IndexedDBdatabase.update(store, data);
            }
        }
    }
}

let btn = document.querySelector("button#start");
btn.addEventListener("click", async() => {
    let jsonFile = await readTextFile("sample-firebase-response.json");
    let database = JSON.parse(jsonFile);
    firebaseToIndexedDB(database);
})