import { fetchDataFromYoutube } from './fetchYoutube.js'

export class DataRequest {
    constructor(url) {
        this.url = url;
        try {
            this.platform = this.getPlatForm();
            this.id = this.extractID();
            this.fetchProtocol = this.initFetchData();
        } catch (errorMsg) {
            console.error(errorMsg);
        }
    }

    doFetch() {
        return this.fetchProtocol.sendRequest();
    }

    getPlatForm() {
        let YouTube = this.url.toLowerCase().includes("youtube");
        let Twitch = this.url.toLowerCase().includes("twitch");
        let FaceBook = this.url.toLowerCase().includes("facebook");

        if (YouTube) {
            return "youtube";
        } else if (Twitch) {
            return "twitch";
        } else if (FaceBook) {
            return "facebook";
        } else {
            throw new Error("No Known Platform!!!");
        }
    }

    extractID() {

        if (this.platform == "youtube") {
            let compareableLink = "https://www.youtube.com/watch?v=";
            if (this.url.toLowerCase().includes(compareableLink) && this.url.length > compareableLink.length) {
                // https://www.youtube.com/watch?v=jhsiyLE7Oy4 -- sample youtube link
                var videoID = this.url.split("v=")[1];
                let ampersandPosition = this.url.indexOf('&');
                if (ampersandPosition == -1) {
                    return videoID;
                } else {
                    return videoID.substring(0, ampersandPosition);
                };
            } else {
                throw new Error("No Video ID Detected!!!");
            }

        } else {
            throw new Error("No Video ID Detected!!!");
        }
    }

    initFetchData() {
        switch (this.platform) {
            case "youtube":
                {
                    return new fetchDataFromYoutube(this.id);
                }
            case "twitch":
                {
                    return fetchDataFromTwitch();
                }
            case "facebook":
                {
                    return fetchDataFromFacebook();
                }
            default:
                {
                    throw new Error("No Valid Fetch Method Found !!!")
                }
        }
    }
}