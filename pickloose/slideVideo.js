import { DataBase } from './database.js'
import { SmallVideoBox } from './smallVideo.js'

export class SlideVideo {
    static template = `
        <div class="slide-info">
            <div class="category">
                <img class="category-icon" src="">
                <div class="category-title">
                    <!-- Category Here -->
                </div>
            </div>
            <div id="seeall">See All</div>
        </div>
        <div class="video-slide">
            <!-- Small Video Box Here -->
        </div>
        `

    static getCategoryInfo(categoryId) {
        switch (categoryId) {
            case "1":
                return {
                    title: "Film & Animation",
                    icon: "icon/film.svg"
                }
            case "2":
                return {
                    title: "Autos & Vehicles",
                    icon: "icon/car.svg"
                }
            case "10":
                return {
                    title: "Music",
                    icon: "icon/music.svg"
                }
            case "15":
                return {
                    title: "Pets & Animals",
                    icon: "icon/pawprint.svg"
                }
            case "17":
                return {
                    title: "Sports",
                    icon: "icon/football.svg"
                }
            case "19":
                return {
                    title: "Travel & Events",
                    icon: "icon/airplane.svg"
                }
            case "20":
                return {
                    title: "Gaming",
                    icon: "icon/game-controller.svg"
                }
            case "22":
                return {
                    title: "People & Blogs",
                    icon: "icon/video(1).svg"
                }
            case "23":
                return {
                    title: "Comedy",
                    icon: "icon/cinema.svg"
                }
            case "24":
                return {
                    title: "Entertainment",
                    icon: "icon/video (1).svg"
                }
            case "25":
                return {
                    title: "News & Politics",
                    icon: "icon/newspaper.svg"
                }
            case "26":
                return {
                    title: "Howto & Style",
                    icon: "icon/guide.svg"
                }
            case "27":
                return {
                    title: "Education",
                    icon: "icon/online-learning.svg"
                }
            case "28":
                return {
                    title: "Science & Technology",
                    icon: "icon/atom.svg"
                }
            case "29":
                return {
                    title: "Nonprofits & Activism",
                    icon: "icon/soin.svg"
                }
            default:
                return {
                    title: categoryId,
                    icon: ""
                }
        }
    }

    static setCategory(categoryCode, categoryWrapper) {
        let categoryIcon = categoryWrapper.querySelector("img.category-icon");
        let categoryTitle = categoryWrapper.querySelector("div.category-title");
        let categoryInfo = SlideVideo.getCategoryInfo(categoryCode);

        categoryIcon.src = categoryInfo.icon;
        categoryTitle.textContent = categoryInfo.title;
    }

    constructor(category, table, database) {
        this.category = category;
        this.table = table;
        this.database = database;

        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("slide-video-wrapper");
        const videoBox = document.querySelector("div.history-box");
        this.wrapper.innerHTML = SlideVideo.template;
        let categoryDiv = this.wrapper.querySelector("div.category");
        SlideVideo.setCategory(this.category, categoryDiv);
        videoBox.appendChild(this.wrapper);
    }

    doFetch() {
        new DataBase(this.database)
            .open()
            .then((db) => {
                return DataBase.openStore(db, this.table, "readonly");
            })
            .then((store) => {
                const VideoThisContainerCanHave = 4;
                var alreadyShowedVideo = 0;
                let lowerBound = [this.category];
                let upperBound = [this.category + "1"];
                let range = IDBKeyRange.bound(lowerBound, upperBound, false, true);
                var cursorRequest = store.index("category").openCursor(range, "prev");
                cursorRequest.onsuccess = (e) => {
                    let cursor = e.target.result;
                    if (cursor && alreadyShowedVideo < VideoThisContainerCanHave) {
                        alreadyShowedVideo++;
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