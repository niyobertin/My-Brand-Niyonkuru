
const querriesFromLocalStorage = JSON.parse(window.localStorage.getItem("querries"));
console.log(querriesFromLocalStorage);
const querryDiv = document.querySelector('.contents');

for(let i = 0;i < querriesFromLocalStorage.length;i++){
    const newQuerry = document.createElement("div");
    newQuerry.classList.add('newest-query');
    const name = document.createElement('h2');
    const names = document.createTextNode(querriesFromLocalStorage[i].name);
    const message = document.createElement('p');
    const messages = document.createTextNode(querriesFromLocalStorage[i].message);

    name.appendChild(names);
    message.appendChild(messages);
    newQuerry.appendChild(name);
    newQuerry.appendChild(message);
    querryDiv.appendChild(newQuerry);
}