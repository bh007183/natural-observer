

let db;
const request = indexedDB.open("Nature", 1)


request.onupgradeneeded = function(){
    const db = request.result;
    const store = db.createObjectStore(["item"], {autoIncrement: true})
}
request.onsuccess = function(){
    db = request.result;
    console.log("ready to go")
}



fetch("/api/notes")
.then(function(res){
    return res.json()
}).then(data => {
    console.log(data)
    data.forEach(function(note){
        document.querySelector("#mainHome").innerHTML +=`
        <div class="wraper">
        <div class="card">
            <div class="cardHeader">
                <h3>${note.title}</h3>
            </div>
            <div class="cardText">
                <p> ${note.observation}</p>
            </div>
            <div>
                <button value=${note.id}>Edit</button>
            </div>
        </div>
        </div>
        `
    })
}).catch(err => {
    console.log("this should fire index.js line 41")
    let action = db.transaction(["item"], "readwrite").objectStore("item")
    action.getAll().onsuccess = function(event){
        event.target.result.forEach(note => {
            document.querySelector("#mainHome").innerHTML +=`
        <div class="wraper">
        <div class="card">
            <div class="cardHeader">
                <h3>${note.title}</h3>
            </div>
            <div class="cardText">
                <p> ${note.observation}</p>
            </div>
            <div>
                <button value=${note.id}>Edit</button>
            </div>
        </div>
        </div>
        `
        })
    }
})

window.addEventListener("online", function(){
    let action = db.transaction(["item"], "readwrite").objectStore("item")
   
    action.getAll().onsuccess = function(event){
        fetch("/api/notes/bulk", {
            method: "POST",
            body: JSON.stringify(event.target.result),
            headers: {
              "Content-Type": "application/json",
            },
          }).then(res => {
              if(!res.ok){
                  alert("Issue going online")
              }
          }).catch(err => console.log(err))
    }
    action.clear()
    

    
})