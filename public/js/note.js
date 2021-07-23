
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





document
  .querySelector("#noteForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const obj = {
      title: document.querySelector("#title").value,
      observation: document.querySelector("#note").value,
    };

    fetch("/api/notese", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
          console.log(res)
          if(!res.ok){
            let text = document.createTextNode(`There was an error with your request.`)
            const target = document.querySelector("#noteStatus")
            target.appendChild(text)
            target.setAttribute("style", "background-color: red")
            setTimeout(() => {
                target.removeChild(text)
            }, 5000);
          }else{
                let text = document.createTextNode("Note Added!")
                const target = document.querySelector("#noteStatus")
                target.appendChild(text)
                target.setAttribute("style", "background-color: greenyellow")
                setTimeout(() => {
                    target.removeChild(text)
                }, 3000);
              
          }
        
      })
      
      .catch((err) => {
          console.log(err)
        let action = db.transaction(["item"], "readwrite").objectStore("item")
        action.put(obj)
      });
  });
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