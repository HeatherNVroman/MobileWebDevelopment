 
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open the database
var open = indexedDB.open("MyDatabase", 1);

// Create the schema
open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("password", {keyPath: "password"});
    var index = store.createIndex("Passwords", ["string.password"]);
};

open.onsuccess = function() {
    // Start a new transaction
    var db = open.result;
    var tx = db.transaction("password", "password");
    var store = tx.objectStore("MyObjectStore");
    var index = store.index("Password");

    // Add some data
    store.put({id: 12345, name: {string: "GH12JF89"}});
    
    // Query the data
    var getstring = store.get(12345);
    var getstring = index.get(["GH12JF89"]);

    getstring.onsuccess = function() {
        console.log(getstring.result.name.string);  // => "GH12JF89"
    };


    // Close the db when the transaction is done
    tx.oncomplete = function() {
        db.close();
    };
}