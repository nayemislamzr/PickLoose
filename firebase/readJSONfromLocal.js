export function readTextFile(file) {
    return new Promise((resolve) => {
        let rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                resolve(rawFile.responseText);
            }
        }
        rawFile.send(null);
    })
}