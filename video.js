export class videoBox {
    constructor() {
        this.startLoading();
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("video-box-wrapper");
        document.querySelector("div.history-box").appendChild(this.wrapper);

        this.loved = false;
        this.playlisted = false;
    }

    startLoading() {
        this.loadingWrapper = document.createElement("div");
        this.loadingWrapper.classList.add("loading-wrapper");
        this.loadingWrapper.textContent = "loading...";
        document.querySelector("div.history-box").appendChild(this.loadingWrapper);
    }

    endLoading() {
        this.loadingWrapper.remove();
    }

    eventListener() {
        let loveIcon = this.wrapper.querySelector("img#love");
        let playlistIcon = this.wrapper.querySelector("img#playlist");
        let deleteIcon = this.wrapper.querySelector("img#remove");

        loveIcon.addEventListener("click", () => {
            if (!this.loved) {
                loveIcon.src = "icons/favourite.svg";
                this.loved = true;
            } else {
                loveIcon.src = "icons/heart (1).svg";
                this.loved = false;
            }
        })

        playlistIcon.addEventListener("click", () => {
            if (!this.playlisted) {
                playlistIcon.src = "icons/playlist.svg";
                this.playlisted = true;
            } else {
                playlistIcon.src = "icons/playlist (1).svg";
                this.playlisted = false;
            }
        })

        deleteIcon.addEventListener("click", () => {
            this.wrapper.remove();
        })
    }

}