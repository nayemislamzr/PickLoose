import { DataRequest } from './pickloose/request.js'
import { DataBase } from './pickloose/database.js'
import { Firebase } from './firebase/firebase.js'

/*
    Gets the version of database which was previously saved 
    in chrome local storage

    @param {} - No parameter needed for now 
    @return - the version of the indexed db database
*/
export function getDataBaseVersion() {
    return new Promise((resolve) => {
        chrome.storage.local.get(null, (response) => {
            if ("version" in response) {
                console.log(response.version);
                resolve(response.version);
            } else {
                resolve(1);
            }
        })
    })
}

/*
    Fetches data with url then saves it into both offline(indexed db)
    & online (firebase realtime database)

    @param {url} - URL of the fethable link
    @returl {} - Nothing
*/
async function initRequest(url) {
    try {
        const databaseName = "youtube";
        const storeName = "history";

        let data = await new DataRequest(url).doFetch();
        Firebase.update(`${databaseName}/${storeName}/${data.id}`, {
            id: data.id,
            playlist: storeName,
            time: new Date()
        });
        let version = await getDataBaseVersion();
        let db = new DataBase("youtube", version);
        let presentInStore = await db.hasThisStore("history");
        if (!presentInStore) {
            db.version += 1;
        }
        db.update("history", data);

    } catch (error) {
        console.log(error);
    }

}

/*
    Gets the URL from BROWSER when in active tab - link is changed
*/
let lastinvoked = undefined;
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (activeInfo.tabId === tabId && changeInfo.url != lastinvoked && changeInfo.url !== undefined) {
            console.log("link changed to", changeInfo.url);
            lastinvoked = changeInfo.url;
            initRequest(changeInfo.url);
        }
    })
})

/*
    Renders extension window in popup window
*/
chrome.browserAction.onClicked.addListener(tab => {
    chrome.windows.create({
        url: chrome.runtime.getURL("./pickloose/index.html"),
        type: "popup",
        focused: true,
        height: 700,
        width: 1090
    });
});