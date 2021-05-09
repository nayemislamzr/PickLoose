import { DataBase } from './database.js'
import { SmallVideoBox } from './smallVideo.js'

export class SlideVideo {
    static template = `
        <div class="slide-info">
            <div class="category">
                Gaming
            </div>
            <div id="seeall">See All</div>
        </div>
        <div class="video-slide">
            <!-- Small Video Box Here -->
        </div>
    `

    constructor(category, table, database) {
        this.category = category;
        this.table = table;
        this.database = database;
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("slide-video-wrapper");

        const videoBox = document.querySelector("div.history-box");
        this.wrapper.innerHTML = SlideVideo.template;
        videoBox.appendChild(this.wrapper);
    }

    doFetch() {
        new DataBase(this.database)
            .open()
            .then((db) => {
                return DataBase.openStore(db, this.table, "readonly");
            })
            .then((store) => {
                let lowerBound = [this.category];
                let upperBound = [this.category + "1"];
                let range = IDBKeyRange.bound(lowerBound, upperBound, false, true);
                var cursorRequest = store.index("category").openCursor(range, "prev");
                cursorRequest.onsuccess = (e) => {
                    let cursor = e.target.result;
                    if (cursor) {
                        console.log(cursor.value);
                        new SmallVideoBox(this.wrapper)
                            .doFetch(cursor.value);
                        cursor.continue();
                    } else {
                        console.log("all data fetched");
                    }
                }
            })
    }

}