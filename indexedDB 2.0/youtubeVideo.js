import { videoBox } from './video.js'

export class youtubeVideoBox extends videoBox {

    static videoTemplate = (`
    <div class="video-box">
    <div id="option">

            </div>
            <div id="reload">

            </div>
            <a id="thumbnail-video-link" href="">
                <div class="thumbnail-wrapper">
                    <div id="platform-logo">

                    </div>
                    <div class="videoDuration">
                        
                    </div>
                    <div id="progress-bar">

                    </div>
                    <img class="thumbnail"> </div>
                <div class="video-info-wrapper">
            </a>
            <div class="title">
                <a id="video-link" href="">

                </a>
            </div>
            <div class="channel">
                <a class="smallText" id="channel-link" href="">

                </a>
                <span class="smallText" id="channel-category">

                </span>
                <span class="smallText" id="uploaded">

                </span>
            </div>
            <div class="stats-wrapper">
                <div class="views-section">
                    <img class="stat-icon" id="view-icon" src="icons/eye.svg">
                    <span class="counter" id="views"> 

                    </span>
                </div>
                <div class="likes-section">
                    <img class="stat-icon" id="like-icon" src="icons/like(3).svg">
                    <span class="counter" id="likes">

                    </span>
                </div>
                <div class="dislikes-section">
                    <img class="stat-icon" id="dislike-icon" src="icons/unlike.svg">
                    <span class="counter" id="dislikes">

                    </span>
                </div>
                <div class="comments-section">
                    <img class="stat-icon" id="comment-icon" src="icons/comments.svg">
                    <span class="counter" id="comments">

                    </span>
                </div>
                <div class="duration-section">
                    <img class="stat-icon" id="duration-icon" src="icons/duration.svg">
                    <span class="counter" id="duration">

                    </span>
                </div>
            </div>
            <div class="preference">
                <div class="loveSec">
                    <img class="pref-icon" id="love" src="icons/heart (1).svg">
                </div>
                <div class="playlistSec">
                    <img class="pref-icon" id="playlist" src="icons/playlist (1).svg">
                </div>
                <div class="shareSec">
                    <img class="pref-icon" id="share" src="icons/share.png">
                    <div class="shareSec-option">
                        <div class="share-method" id="link">Copy link</div>
                        <div class="share-method" id="facebook">Share on Facebook</div>
                        <div class="share-method" id="discord">Share on Discord</div>
                    </div>
                </div>
                <div class="removeSec">
                    <img class="pref-icon" id="remove" src="icons/delete.svg">
                </div>
            </div>
            </div>
            </div>
    `)

    static getCategory(categoryId) {
        switch (categoryId) {
            case "0":
                return "";
            case "1":
                return "Film & Animation";
            case "2":
                return "Autos & Vehicles";
            case "10":
                return "Music";
            case "15":
                return "Pets & Animals";
            case "17":
                return "Sports";
            case "19":
                return "Travel & Events";
            case "20":
                return "Gaming";
            case "22":
                return "People & Blogs";
            case "23":
                return "Comedy";
            case "24":
                return "Entertainment";
            case "25":
                return "News & Politics";
            case "26":
                return "Howto & Style";
            case "27":
                return "Education";
            case "28":
                return "Science & Technology";
            case "29":
                return "Nonprofits & Activism";
            default:
                return categoryId;
        }
    }

    static getFormattedInformation(info) {

        let digit = parseInt(info);
        let thousand = digit >= 1000;
        let million = digit >= 1000000;
        let billion = digit >= 100000000;

        if (billion) {
            return `${(digit/100000000).toFixed(1)}B`;
        } else if (million) {
            return `${(digit/1000000).toFixed(1)}M`;
        } else if (thousand) {
            return `${(digit/1000).toFixed(1)}K`;
        } else return `${digit}`;

    }

    static getFormattedTime(duration) {

        if (duration == "P0D") {
            return `LIVE`;
        }

        var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

        match = match.slice(1).map(function(x) {
            if (x != null) {
                return x.replace(/\D/, '');
            }
        });

        var hours = (parseInt(match[0]) || 0);
        var minutes = (parseInt(match[1]) || 0);
        var seconds = (parseInt(match[2]) || 0);

        if (hours) {
            return `${hours}:${minutes.toString().padStart(2,0)}:${seconds.toString().padStart(2,0)}`;
        } else {
            return `${minutes}:${seconds.toString().padStart(2,0)}`;
        }

    }

    static getTimeDifference(upload) {
        let nowTime = new Date();
        let uploadTime = new Date(upload);
        let timeDifference = Math.ceil((nowTime - uploadTime) / (1000));
        let minute = parseInt(timeDifference / 60);
        let hour = parseInt(timeDifference / (60 * 60));
        let day = parseInt(timeDifference / (60 * 60 * 24));
        let week = parseInt(timeDifference / (60 * 60 * 24 * 7));
        let month = parseInt(timeDifference / (60 * 60 * 24 * 30));
        let year = parseInt(timeDifference / (60 * 60 * 24 * 30 * 12));

        if (year) {
            return `${year} years`;
        } else if (month) {
            return `${month} months`;
        } else if (week) {
            return `${week} weeks`;
        } else if (day) {
            return `${day} days`;
        } else if (hour) {
            return `${hour} hours`;
        } else if (minute) {
            return `${minute} minutes`;
        } else {
            return `${timeDifference} seconds`;
        }

    }

    constructor(link) {
        super(link);
    }

    downloadThumbnail(thumbnail) {
        return new Promise((resolve) => {
            fetch(thumbnail, { mode: 'no-cors' })
                .then(() => {
                    resolve();
                })
        })
    }

    startLoading() {
        this.loadingWrapper = new DOMParser().parseFromString(youtubeVideoBox.loadingTemplate, "text/html").children[0];
        this.wrapper.appendChild(this.loadingWrapper);
    }

    endLoading() {
        this.loadingWrapper.remove();
    }

    showData(data) {

        this.data = data;
        data.id = data["video"]["id"];
        let videoNode = new DOMParser().parseFromString(youtubeVideoBox.videoTemplate, "text/html").children[0];

        const videoId = data["video"]["id"];
        const channelId = data["channel"]["id"];
        const thumbnail = data["video"]["thumbnails"]["medium"]["url"];
        const title = data['video']['title'];
        const channelName = data['channel']['name'];
        const categoryId = data['channel']['categoryId'];
        const uploadTime = new Date(data['video']['publishedAt']);
        const likesInDigit = data['video']['likes'];
        const dislikesInDigit = data['video']['unlikes'];
        const commentsInDigit = data['video']['comments'];
        const viewsInDigit = data['video']['views'];
        const nonFormattedDuration = data['video']['duration'];

        let category = youtubeVideoBox.getCategory(categoryId);
        const formattedLikes = youtubeVideoBox.getFormattedInformation(likesInDigit);
        const formattedDislikes = youtubeVideoBox.getFormattedInformation(dislikesInDigit);
        const formattedComments = youtubeVideoBox.getFormattedInformation(commentsInDigit);
        const formattedViews = youtubeVideoBox.getFormattedInformation(viewsInDigit);
        const formattedDuration = youtubeVideoBox.getFormattedTime(nonFormattedDuration);
        const uploadTimeDifference = youtubeVideoBox.getTimeDifference(uploadTime);

        let thumbnailDuration = videoNode.querySelector("div.videoDuration");
        let videoLink = videoNode.querySelector("a#video-link");
        let videoThumbnail = videoNode.querySelector("div img.thumbnail");
        let thumbnailVideoLink = videoNode.querySelector("a#thumbnail-video-link");
        let channelLink = videoNode.querySelector("a#channel-link");
        let channelCategory = videoNode.querySelector("span#channel-category");
        let uploadedOn = videoNode.querySelector("span#uploaded");
        let viewCounter = videoNode.querySelector("span#views");
        let likeCounter = videoNode.querySelector("span#likes");
        let dislikeCounter = videoNode.querySelector("span#dislikes");
        let commentCounter = videoNode.querySelector("span#comments");
        let durationCounter = videoNode.querySelector("span#duration");

        if (formattedDuration == "LIVE") {
            thumbnailDuration.classList.add("live");
            thumbnailDuration.innerText = "LIVE";
        } else {
            thumbnailDuration.classList.add("timeVideoDuration");
            thumbnailDuration.innerText = formattedDuration;
        }
        videoLink.href = `https://youtube.com/watch?v=${videoId}`;
        videoLink.innerText = title;
        // videoThumbnail.src = thumbnail;
        thumbnailVideoLink.href = `https://youtube.com/watch?v=${videoId}`;
        channelLink.href = `https://youtube.com/channel/${channelId}`;
        channelLink.innerText = channelName;
        channelCategory.innerText = category;
        uploadedOn.innerText = `${uploadTimeDifference} ago`;
        viewCounter.innerText = formattedViews;
        likeCounter.innerText = formattedLikes;
        dislikeCounter.innerText = formattedDislikes;
        commentCounter.innerText = formattedComments;
        durationCounter.innerText = formattedDuration;

        this.downloadThumbnail(thumbnail)
            .then(() => {
                videoThumbnail.src = thumbnail;
            })
            .then(() => {
                this.wrapper.appendChild(videoNode);
                this.endLoading();
            })
            .then(() => {
                this.eventListener();
            })

    }

}