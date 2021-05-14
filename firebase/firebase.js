/*
    Firebase - class

                |--- ID
        Data----|--- Playlist (store in indexed db database implimetation)
                |--- Time (time when the video was seen)

        #get -
            gets the data from given link (source firebase real time database)
        @param {field} - Directory to the data supposed to get
        @return {data} - When promise is resolved data in the given directory is 
                        returned

        #insert -
            inserts data to the given directory
        @param {field} - The directory
        @return {data} - The video data 
        
        #update -
            updates data if not inserted inserts data.
        @param {field} - The directory
        @return {data} - The video data 

        #delete-
            Deletes data to the given directory
        @param {field} - The directory    
*/
export class Firebase {

    static get(field) {
        return new Promise((resolve) => {
            firebase.database.ref(field).on("value", response => {
                resolve(response.val());
            })
        })
    }

    static insert(field, data) {
        firebase.database().ref(field).set(data);
    }

    static update(field, data) {
        firebase.database().ref(field).update(data);
    }

    static delete(field) {
        firebase.database().ref(field).delete();
    }
}