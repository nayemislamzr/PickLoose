import { youtubeVideoBox } from './youtubeVideo.js'
import { DataRequest } from './request.js'
import { DataBase } from './index.js'
import { navBar, switchPlatform } from './eventListener.js'

const inputBox = document.querySelector("input#search");

// inputBox.addEventListener("keydown", e => {
//     if (e.keyCode == 13 || e.key == "Enter") {
//         let link = e.target.value;
//         let video = new youtubeVideoBox(link);
//         let request = new DataRequest(link);
//         request.doFetch()
//             .then((data) => {
//                 new DataBase("pankha", 8, ["youtube"], "id").update("youtube", data);
//                 video.showData(data);
//             })
//     }
// })


// new DataBase("pankha", 10, ["youtube"], "id")
//     .open()
//     .then((db) => {

//         let objectStore = db.transaction("youtube", "readonly")
//             .objectStore("youtube");
//         let request = objectStore.openCursor();
//         request.onsuccess = (e) => {
//             let cursor = e.target.result;
//             if (cursor) {
//                 new youtubeVideoBox(`https://www.youtube.com/watch?v=${cursor.value.id}`)
//                     .showData(cursor.value);
//                 cursor.continue();
//             } else {
//                 console.log("All data retrieved");
//             }
//         }
//     })

// new DataBase("pankha", 8, ["youtube"], "id")
//     .open()
//     .then((db) => {
//         let objectStore = db.transaction("youtube", "readonly")
//             .objectStore("youtube");
//         return objectStore;
//     })
//     .then((objectStore) => {

//         return new Promise((resolve, reject) => {
//             let request = objectStore.getAll();
//             request.onsuccess = (e) => {
//                 let videos = e.target.result;
//                 resolve(videos);
//             }
//         })

//     })
//     .then((videos) => {
//         videos.forEach((video) => {
//             new youtubeVideoBox(`https://www.youtube.com/watch?v=${video.id}`)
//                 .showData(video);
//         })
//     })

// new DataBase("pankha", 8, ["youtube"], "id")
//     .open()
//     .then((db) => {
//         let objectStore = db.transaction("youtube", "readonly")
//             .objectStore("youtube");
//         return objectStore;
//     })
//     .then((objectStore) => {
//         let request = objectStore.getAll();
//         request.onsuccess = (e) => {
//             let videos = e.target.result;
//             videos.forEach((video) => {
//                 new youtubeVideoBox(`https://www.youtube.com/${video.id}`)
//                     .showData(video)
//             })
//         }
//     })

// new DataBase("pankha", 8, ["youtube"], "id")
//     .open()
//     .then((db) => {
//         return DataBase.openStore(db, "youtube", "readonly")
//     })
//     .then((objectStore) => {
//         let request = objectStore.getAll();
//         request.onsuccess = (e) => {
//             let videos = e.target.result;
//             videos.forEach((video) => {
//                 new youtubeVideoBox(`https://www.youtube.com/${video.id}`)
//                     .showData(video)
//             })
//         }
//     })


navBar();
switchPlatform();

// (() => {
//     new DataBase("pankha", 10).open(["youtube"])
//         .then((db) => {
//             return db.objectStoreNames;
//         })
//         .then((stores) => {
//             console.log(stores);
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// })()

// (async() => {
//     try {
// let youtubedatabase = await new DataBase("pankha", 10).open(["youtube"]);
// let objectStore = await DataBase.openStore(youtubedatabase , "youtube" , "readwrite");
// objectStore.add({id : "xxxxxx" , data : "this is data"});
// objectStore.onsuccess = () 

// let stores = youtubedatabase.objectStoreNames;
// stores.forEach((store) => {
//     DataBase.openStore(youtubedatabase, store, "readonly")
//         .then((objectStore) => {
//             let request = objectStore.getAll();
//             request.onsuccess = (e) => {
//                 let videosData = e.target.result;
//                 console.log(videosData);
//             }
//         })

// })
//     } catch (error) {
//         console.log(error);
//     }

// })()

// (() => {
//     let database = indexedDB.open("pankha", 10);
//     database.onsuccess = (e) => {
//         let db = e.target.result;
//         let transaction = db.transaction("youtube", "readwrite")
//         let objectStore = transaction.objectStore("youtube");
//         transaction.oncomplete = () => { console.log("all request completed") };
//         transaction.onerror = () => { console.log("all request could not be successfull...reversing changes") };
//         let request1 = objectStore.put({ id: "asdsadsa", data: "this is data" });
//         let request2 = objectStore.delete("asdsadsa");
//         let request3 = objectStore.get("asdsadsa");
//         let request4 = objectStore.add({ id: "asdsadsa", data: "this is data" });
//         request1.onsuccess = () => { console.log("request1 completed") }
//         request1.onerror = () => { console.log("request1 failed") }
//         request2.onsuccess = () => { console.log("request2 completed") }
//         request2.onerror = () => { console.log("request2 failed") }
//         request3.onsuccess = () => { console.log("request3 completed", request3.result) }
//         request3.onerror = () => { console.log("request3 failed") }
//         request4.onsuccess = () => { console.log("request4 completed") }
//         request4.onerror = () => { console.log("request4 failed") }
//     }
// })()

const datas = { "video": { "title": "TimeCop1983 - Night Drive Instrumental Edition [Album]", "id": "AGCluKbW1AY", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/AGCluKbW1AY/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/AGCluKbW1AY/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/AGCluKbW1AY/hqdefault.jpg", "width": 480, "height": 360 }, "standard": { "url": "https://i.ytimg.com/vi/AGCluKbW1AY/sddefault.jpg", "width": 640, "height": 480 }, "maxres": { "url": "https://i.ytimg.com/vi/AGCluKbW1AY/maxresdefault.jpg", "width": 1280, "height": 720 } }, "duration": "PT55M10S", "description": "Support =) : paypal - kkm73@yandex.ru , https://new.donatepay.ru/@477537\nhttps://timecop1983.bandcamp.com/\n\n00:00 Static (feat. The Midnight) [instrumental]\n04:54 On the Run\n09:55 Back to You (feat. The Bad Dreamers) [instrumental]\n14:22 Cruise\n20:17 Neon Lights (feat. Josh Dally) [instrumental]\n24:15 Afterglow - Wrong title on video - need to reupload? sorry =\\\n29:18 Too Late (feat. LeBrock) [instrumental]\n34:20 Skylines\n39:23 Tokyo (feat. Kinnie Lane) [instrumental]\n44:27 Nightfall\n49:07 It was only a Dream", "publishedAt": "2018-08-10T08:49:16Z", "views": "1653949", "likes": "26640", "unlikes": "371", "comments": "1269", "tags": ["synthwave", "synthpop", "retrowave", "newretrowave", "new retro", "lo-fi", "80s", "80's"] }, "channel": { "name": "MrHajimeSaitou", "id": "UCD-VG4G_s--NKxbYwtlRoDw", "categoryId": "10" }, "id": "AGCluKbW1AY" }


try {
    let database = new DataBase("pankha", 14);
    database.update(["youtube"], datas);
    database.get(["youtube"], "AGCluKbW1AY")
        .then((data) => {
            let video = new youtubeVideoBox(`https://www.youtube.com/watch?v=${data.id}`);
            video.showData(data);
        })

} catch (error) {
    console.log(error);
}