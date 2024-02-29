
const querriesFromLocalStorage = JSON.parse(window.localStorage.getItem("querries"));
console.log(querriesFromLocalStorage);
const dataFromLocalStorage = JSON.parse(window.localStorage.getItem("blogs"));
console.log(dataFromLocalStorage);
let querries = document.getElementById('total-querry');
querries.innerHTML = querriesFromLocalStorage.length + ' ';
let articals = document.getElementById('total-artical');
articals.innerHTML = dataFromLocalStorage.length + ' ';

//reading single querry



