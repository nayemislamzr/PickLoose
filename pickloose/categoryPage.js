import { DataBase } from './database.js';
import { navBar, switchPlatform } from './eventListener.js'
import { SlideVideo } from './slideVideo.js'

(() => {
    navBar();
    switchPlatform();
    new DataBase("youtube")
        .open()
        .then((db) => {
            let Playlist = db.objectStoreNames;
            console.log(db.version);
            for (let playlistIndex = 0; playlistIndex < Playlist.length; playlistIndex++) {
                DataBase.openStore(db, Playlist.item(playlistIndex), "readwrite")
                    .then((store) => {
                        let categoryIndex = store.index("category");
                        let getKeyCursor = categoryIndex.openKeyCursor(null, "next");
                        let allCategories = new Set();
                        getKeyCursor.onsuccess = e => {
                            let cursor = e.target.result;
                            if (cursor) {
                                allCategories.add(cursor.key[0]);
                                cursor.continue();
                            } else {
                                console.log("Got all the keys", allCategories);
                                allCategories.forEach((category) => {
                                    new SlideVideo(category, Playlist.item(playlistIndex), "youtube")
                                        .doFetch();
                                })
                            }
                        }
                        getKeyCursor.onerror = e => { console.log(e.target.error) };
                    })
            }
        })
})();