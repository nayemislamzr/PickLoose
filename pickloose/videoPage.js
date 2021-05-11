import { youtubeVideoBox } from './youtubeVideo.js'
import { DataBase } from './database.js'
import { navBar, switchPlatform, getCategoryOrPlaylist } from './eventListener.js'
import { getDataBaseVersion } from '../background.js'

(async() => {
    document.addEventListener("DOMContentLoaded", () => {
        navBar();
        switchPlatform();
        getCategoryOrPlaylist();
    })

    let storeName = "history";

    let version = await getDataBaseVersion();
    let db = new DataBase("youtube", version);
    let presentInStore = await db.hasThisStore(storeName);

    if (!presentInStore) {
        db.version += 1;
    }

    db.open(storeName)
        .then((youtubedb) => {
            return DataBase.openStore(youtubedb, storeName, "readonly");
        })
        .then((objectStore) => {
            let cursorRequest = objectStore.index("time").openCursor(null, "prev");
            cursorRequest.onsuccess = e => {
                let cursor = e.target.result;
                if (cursor) {
                    let video = cursor.value;
                    new youtubeVideoBox()
                        .showData(video);
                    cursor.continue();
                } else {
                    console.log("all video have been fetched");
                }
            }
        })
})()