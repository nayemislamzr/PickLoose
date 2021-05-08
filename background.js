import { DataRequest } from './pickloose/request.js'
import { DataBase } from './pickloose/database.js'

function initRequest(url) {
    try {
        new DataRequest(url)
            .doFetch()
            .then((data) => {
                data.time = new Date();
                new DataBase("youtube")
                    .update(["history"], data);
            })
    } catch (error) {
        console.log(error);
    }
}

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (activeInfo.tabId === tabId && changeInfo.url) {
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