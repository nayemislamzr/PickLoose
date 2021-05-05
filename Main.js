import { DataRequest } from './request.js'
import { youtubeVideoBox } from './youtubeVideo.js'

const inputBox = document.querySelector("input#Youtube-video");

inputBox.addEventListener("keydown", e => {
    if (e.keyCode == 13 || e.key == "Enter") {
        let link = e.target.value;
        let video = new youtubeVideoBox(link);
        let request = new DataRequest(link);
        request.doFetch()
            .then((data) => {
                video.showData(data);
            })
    }
})