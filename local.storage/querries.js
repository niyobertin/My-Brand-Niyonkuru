
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
    const delete_button = document.createElement('button');
    delete_button.id ='delete';
    const replay_button = document.createElement('button');
    replay_button.id = 'replay';
    delete_button.innerHTML = 'Delete';
    replay_button.innerHTML = 'Replay';



    name.appendChild(names);
    message.appendChild(messages);
    newQuerry.appendChild(name);
    newQuerry.appendChild(message);
    newQuerry.appendChild(replay_button);
    newQuerry.appendChild(delete_button)
    querryDiv.appendChild(newQuerry);
}