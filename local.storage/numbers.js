
const querriesFromLocalStorage = JSON.parse(window.localStorage.getItem("querries"));
console.log(querriesFromLocalStorage);
const dataFromLocalStorage = JSON.parse(window.localStorage.getItem("blogs"));
console.log(dataFromLocalStorage);
let querries = document.getElementById('total-querry');
querries.innerHTML = querriesFromLocalStorage.length + ' ';
let articals = document.getElementById('total-artical');
articals.innerHTML = dataFromLocalStorage.length + ' ';
console.log(articals);

for(let i = 0;i<deletes.length;i++){
    for(let j = 0;j < dataFromLocalStorage.length;j++){
        deletes[i].addEventListener("click",() =>{
        if(i === j){
            console.log(dataFromLocalStorage[i]);
        }
        })
    }
    
 }

