import { DataRequest } from './request.js'

export class videoBox {

    static loadingTemplate = `
    <div class="video-box">
    <div class="loading-thumbnail-wrapper">

        </div>
        <div class="video-info-wrapper">
            <div class="loading-title"></div>
            <div class="loading-channel"></div>
            <div class="loading-stats-wrapper"></div>
            <div class="loading-preference"></div>
        </div>
    </div>    
    `

    constructor(link) {

        this.link = link;
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("video-box-wrapper");
        document.querySelector("div.history-box").appendChild(this.wrapper);
        this.startLoading();

        this.loved = false;
        this.playlisted = false;
    }

    giveLove(loveIcon) {
        if (!this.loved) {
            loveIcon.src = "icons/favourite.svg";
            this.loved = true;
        } else {
            loveIcon.src = "icons/heart (1).svg";
            this.loved = false;
        }
    }

    setPaylist(playlistIcon) {
        if (!this.playlisted) {
            playlistIcon.src = "icons/playlist.svg";
            this.playlisted = true;
        } else {
            playlistIcon.src = "icons/playlist (1).svg";
            this.playlisted = false;
        }
    }

    delete() {
        this.wrapper.remove();
    }

    reload() {
        let videoBox = this.wrapper.querySelector("div.video-box");
        videoBox.remove();
        this.startLoading();
        let request = new DataRequest(this.link);
        request.doFetch()
            .then((data) => {
                this.showData(data);
            })
    }

    eventListener() {
        let loveIcon = this.wrapper.querySelector("img#love");
        let playlistIcon = this.wrapper.querySelector("img#playlist");
        let deleteIcon = this.wrapper.querySelector("img#remove");
        let reloadIcon = this.wrapper.querySelector("div#reload");

        loveIcon.addEventListener("click", () => { this.giveLove(loveIcon) })

        playlistIcon.addEventListener("click", () => { this.setPaylist(playlistIcon) })

        deleteIcon.addEventListener("click", () => { this.delete() })

        reloadIcon.addEventListener("click", () => { this.reload() })
    }

}