export function navBar() {
    const navigation = document.querySelector("div.nav-bar");
    let pointingTo = navigation.querySelector("div#video");
    let newIndicator = pointingTo.querySelector("div.nav-select-indicator");
    newIndicator.style.display = "block";
    const navigators = navigation.querySelectorAll("div.nav");

    navigators.forEach((navigator) => {
        navigator.addEventListener("click", () => {
            console.log(navigator.id)

            let newLocation = navigator;
            newIndicator = navigator.querySelector("div.nav-select-indicator");
            let pastIndicator = pointingTo.querySelector("div.nav-select-indicator");

            pastIndicator.style.display = "none";
            pointingTo = newLocation;
            newIndicator.style.display = "block";
        })
    })
}

export function switchPlatform() {
    const platformColors = {
        youtube: "#e81559",
        twitch: "rgb(212, 17, 212)",
        facebook: "rgb(0, 110, 255)"
    }
    const platformWrapper = document.querySelector("div.platform-wrapper");
    let pointingTo = platformWrapper.querySelector("div#youtube");
    pointingTo.style.border = `3.6px solid ${platformColors["youtube"]}`;
    let platforms = platformWrapper.querySelectorAll("div.platform");

    platforms.forEach((platform) => {
        platform.addEventListener("click", () => {
            console.log(platform.id);

            pointingTo.style.border = "3.6px solid transparent";
            pointingTo = platform;
            pointingTo.style.border = `3.6px solid ${platformColors[platform.id]}`;
        })
    })

}

export function getCategoryOrPlaylist() {
    const selectionWrapper = document.querySelector("div.selection-wrapper");
    const category = selectionWrapper.querySelector("div#all-catergory");

    category.addEventListener("click", () => {
        let url = chrome.runtime.getURL("firebase/test.html");
        window.open(url, "_self");
    })

}