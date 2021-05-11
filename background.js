import { DataRequest } from './pickloose/request.js'
import { DataBase } from './pickloose/database.js'

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

async function initRequest(url) {
    try {
        let data = await new DataRequest(url).doFetch();
        let version = await getDataBaseVersion();
        let db = new DataBase("youtube", version);
        let presentInStore = await db.hasThisStore("music");
        if (!presentInStore) {
            db.version += 1;
        }
        db.update("music", data);

    } catch (error) {
        console.log(error);
    }

}

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


chrome.browserAction.onClicked.addListener(tab => {
    chrome.windows.create({
        url: chrome.runtime.getURL("./pickloose/index.html"),
        type: "popup",
        focused: true,
        height: 700,
        width: 1080
    });
});