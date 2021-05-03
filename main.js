const inputBox = document.querySelector("body input#Youtube-video");
const historyBox = document.querySelector("body div.history-box");
const templateVideo = document.querySelector("body template.video-wrapper");

function fetchDataFromYoutube(url) {

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(response => {
                return response["items"][0];
            })
            .then(response => {
                const snippet = response["snippet"];
                const contentDetails = response["contentDetails"]
                const statistics = response["statistics"];
                let videoInformation = {
                    video: {
                        title: (snippet["title"] || ""),
                        id: (response["id"] || ""),
                        thumbnails: (snippet["thumbnails"] || ""),
                        duration: (contentDetails["duration"] || 0),
                        description: (snippet["description"] || ""),
                        publishedAt: (snippet["publishedAt"] || 0),
                        views: (statistics["viewCount"] || 0),
                        likes: (statistics["likeCount"] || 0),
                        unlikes: (statistics["dislikeCount"] || 0),
                        comments: (statistics["commentCount"] || 0),
                        tags: (snippet["tags"] || "")
                    },
                    channel: {
                        name: (snippet["channelTitle"] || ""),
                        id: (snippet["channelId"] || ""),
                        categoryId: (snippet["categoryId"] || "0")
                    }
                }
                return videoInformation;
            })
            .then(response => {
                resolve(response);
            })
    });

}

function getCategory(categoryId) {
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

function getFormattedInformation(info) {

    digit = parseInt(info);
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

function getFormattedTime(duration) {

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

function getTimeDifference(upload) {
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

function showData(data) {
    console.log(data);
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

    let category = getCategory(categoryId);
    const formattedLikes = getFormattedInformation(likesInDigit);
    const formattedDislikes = getFormattedInformation(dislikesInDigit);
    const formattedComments = getFormattedInformation(commentsInDigit);
    const formattedViews = getFormattedInformation(viewsInDigit);
    const formattedDuration = getFormattedTime(nonFormattedDuration);
    const uploadTimeDifference = getTimeDifference(uploadTime);

    const videoWrapper = document.importNode(templateVideo.content, true);

    let thumbnailDuration = videoWrapper.querySelector("div.videoDuration");
    let videoLink = videoWrapper.querySelector("a#video-link");
    let videoThumbnail = videoWrapper.querySelector("div img.thumbnail");
    let thumbnailVideoLink = videoWrapper.querySelector("a#thumbnail-video-link");
    let channelLink = videoWrapper.querySelector("a#channel-link");
    let channelCategory = videoWrapper.querySelector("span#channel-category");
    let uploadedOn = videoWrapper.querySelector("span#uploaded");
    let viewCounter = videoWrapper.querySelector("span#views");
    let likeCounter = videoWrapper.querySelector("span#likes");
    let dislikeCounter = videoWrapper.querySelector("span#dislikes");
    let commentCounter = videoWrapper.querySelector("span#comments");
    let durationCounter = videoWrapper.querySelector("span#duration");


    if (formattedDuration == "LIVE") {
        thumbnailDuration.classList.add("live");
        thumbnailDuration.innerText = "LIVE";
    } else {
        thumbnailDuration.classList.add("timeVideoDuration");
        thumbnailDuration.innerText = formattedDuration;
    }
    videoLink.href = `https://youtube.com/watch?v=${videoId}`;
    videoLink.innerText = title;
    videoThumbnail.src = thumbnail;
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

    historyBox.appendChild(videoWrapper);
}

(() => {

    document.addEventListener("click", e => {
        switch (e.target.id) {
            case "love":
                {
                    // console.log("loving", e.target.offsetParent);
                    e.target.src = "icons/favourite.svg";
                    break;
                }
            case "playlist":
                {
                    // console.log("listing", e.target.offsetParent);
                    e.target.src = "icons/playlist.svg";
                    break;
                }
            case "share":
                {
                    // console.log("sharing", e.target.offsetParent);
                    break;
                }
            case "remove":
                {
                    // console.log("removing", e.target.offsetParent);
                    e.target.offsetParent.remove();
                    break;
                }
            default:
                {
                    break;
                }
        }
    })

})();

inputBox.addEventListener("keydown", async(e) => {
    if (e.keyCode == 13 || e.key == "Enter") {
        const videoId = e.target.value;
        const parameters = ["contentDetails", "statistics", "status", "topicDetails",
            "snippet"
        ];
        const apiKey = "AIzaSyAb9HpInTZvYBKD5346DLqQnnKqKl5Btdc";
        const requestUrl = "https://youtube.googleapis.com/youtube/v3/videos?";

        let constructParameter = (res = new String()) => {
            parameters.forEach(param => {
                res += `part=${param}&`;
            });
            return res;
        }
        request = requestUrl + constructParameter() + "id=" + videoId + "&key=" + apiKey;

        let retrivedData = await fetchDataFromYoutube(request);

        showData(retrivedData);

    }
})