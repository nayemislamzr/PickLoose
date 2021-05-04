let xhr = new XMLHttpRequest();
xhr.onload = () => {
    console.log(xhr.status);
}
xhr.open("GET", "https://twitchtracker.com/statistics");
xhr.send();