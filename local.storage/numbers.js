
let querriesFromLocalStorage = JSON.parse(window.localStorage.getItem("querries"));
if(querriesFromLocalStorage === null){
    querriesFromLocalStorage = []; 
}
let dataFromLocalStorage = JSON.parse(window.localStorage.getItem("blogs"));
if(dataFromLocalStorage === null){
    dataFromLocalStorage = [];
}
let querries = document.getElementById('total-querry');
querries.innerHTML = querriesFromLocalStorage.length + ' ';
let articals = document.getElementById('total-artical');
articals.innerHTML = dataFromLocalStorage.length + ' ';

 let usersComment = JSON.parse(localStorage.getItem('comments'));
if(usersComment === null){
    usersComment = [];
}
 let messages = document.getElementById("total-comments");
 messages.innerHTML = usersComment.length + " ";
