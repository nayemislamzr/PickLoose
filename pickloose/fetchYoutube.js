/*
    Fetches youtube video inforamtion with given URL

    @param {url} - The URL to be fetched
    @return {videoinformation} - resolves promise when data is fetched 
*/
function YouTubeVideoFetch(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(jsonResponse => {
                return jsonResponse["items"][0];
            })
            .then(data => {
                const snippet = data["snippet"];
                const contentDetails = data["contentDetails"]
                const statistics = data["statistics"];
                let videoInformation = {
                    id: (data["id"]),
                    time: new Date(),
                    category: snippet["categoryId"],
                    video: {
                        title: (snippet["title"] || ""),
                        id: (data["id"] || ""),
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
                resolve(videoInformation);
            })
    });
}

export class fetchDataFromYoutube {
    /*
        Private methods and variables here
    */
    static parameters = ["contentDetails", "statistics", "status", "topicDetails",
        "snippet"
    ];
    static apiKey = "AIzaSyAb9HpInTZvYBKD5346DLqQnnKqKl5Btdc";
    static requestUrl = "https://youtube.googleapis.com/youtube/v3/videos?";
    static constructParameter = () => {
        var res = new String();
        fetchDataFromYoutube.parameters.forEach(param => {
            res += `part=${param}&`;
        });
        return res;
    }

    /*
        Constructor Here
    */

    constructor(id) {
        this.id = id;
        this.requestPayload = this.createRequest();
    }

    /*
        Creates GET method request url
        returns request url
    */
    createRequest = function() {
        let requestTarget = fetchDataFromYoutube.constructParameter();
        let requestPayload = fetchDataFromYoutube.requestUrl + requestTarget + "id=" + this.id +
            "&key=" + fetchDataFromYoutube.apiKey;
        return requestPayload;
    }

    /*
        sends Request & returns it
    */

    sendRequest = function() {
        return YouTubeVideoFetch(this.requestPayload);
    }

}