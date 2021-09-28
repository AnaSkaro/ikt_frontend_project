window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || 
window.msIndexedDB;
 
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || 
window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || 
window.webkitIDBKeyRange || window.msIDBKeyRange
 
if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}
const employeeData = [
    {id:'',title:'',description:'',image:''}
    // { id: "00-01", name: "gopal", age: 35, email: "gopal@tutorialspoint.com" },
    // { id: "00-02", name: "prasad", age: 32, email: "prasad@tutorialspoint.com" }
 ];
var db;
var request = window.indexedDB.open("newDatabase", 1);

request.onerror = function(event) {
   console.log("error: ");
};

request.onsuccess = function(event) {
   db = request.result;
   console.log("success: "+ db);
};

request.onupgradeneeded = function(event) {
   var db = event.target.result;
   var objectStore = db.createObjectStore("receipeblog", {keyPath: "id"});
   
   // for (var i in employeeData) {
   //    objectStore.add(employeeData[i]);
   // }
}



// request.onupgradeneeded = function(){
//     console.log("onupgradeneeded",request.result)
//     db = request.result;  
//     var objectStore = db.createObjectStore("employee");
//     var objectStore = db.createObjectStore("employee", {keyPath: "id"});
            
//     for (var i in employeeData) {
//        objectStore.add(employeeData[i]);
//     }
// }

