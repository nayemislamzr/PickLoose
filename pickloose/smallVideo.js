export class SmallVideoBox {
    static videoTemplate = `
    <div class="small-thumbnail-wrapper">
        <img class="small-thumbnail" src="">
    </div>
    <div class="small-video-info">
        <div class="video-info">
            
        </div>
        <div class="channel-info">
            
        </div>
    </div>
    `

    constructor(platter) {
        const videoSlide = platter.querySelector("div.video-slide");

        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("small-video-box");
        this.wrapper.innerHTML = SmallVideoBox.videoTemplate;
        videoSlide.appendChild(this.wrapper);

        this.startLoading();
    }

    startLoading() {
        console.log("loading data...");
    }

    endLoading() {
        console.log("fetched...");
    }

    doFetch(data) {
        const smallvideoimg = this.wrapper.querySelector("img");
        const videoTitle = this.wrapper.querySelector("div.video-info");
        const channelTitle = this.wrapper.querySelector("div.channel-info");

        smallvideoimg.src = data.video.thumbnails.medium.url;
        videoTitle.innerText = data.video.title;
        channelTitle.innerText = data.channel.name;
    }
}