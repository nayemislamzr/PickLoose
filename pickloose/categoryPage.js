import { DataBase } from './database.js';
import { navBar, switchPlatform } from './eventListener.js'
import { SlideVideo } from './slideVideo.js'

(() => {
    navBar();
    switchPlatform();
    // let slide = new SlideVideo("24", "history", "youtube");
    // slide.doFetch();
    new DataBase("youtube")
        .open()
        .then((db) => {
            let Playlist = db.objectStoreNames;
            for (let playlistIndex = 0; playlistIndex < Playlist.length; playlistIndex++) {
                new SlideVideo("25", Playlist.item(playlistIndex), "youtube")
                    .doFetch();
            }
        })
})();