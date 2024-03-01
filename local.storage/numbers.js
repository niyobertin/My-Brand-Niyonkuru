
const querriesFromLocalStorage = JSON.parse(window.localStorage.getItem("querries"));
const dataFromLocalStorage = JSON.parse(window.localStorage.getItem("blogs"));
let querries = document.getElementById('total-querry');
querries.innerHTML = querriesFromLocalStorage.length + ' ';
let articals = document.getElementById('total-artical');
articals.innerHTML = dataFromLocalStorage.length + ' ';

 const usersComment = JSON.parse(localStorage.getItem('comments'));
 let messages = document.getElementById("total-comments");
 messages.innerHTML = usersComment.length + " ";
console.log(usersComment) 

const mangemessage = document.querySelector('.contents');
for(let i = 0;i<usersComment.length;i++){
const recevedMessage = document.createElement("div");
recevedMessage.classList.add('.newest-comment');
recevedMessage.style.backgroundColor ='#1e1e1e';
recevedMessage.style.marginTop = "3%"
recevedMessage.style.width = "80%"
recevedMessage.style.padding = "1%"
recevedMessage.style.borderRadius = "10px"
const names = document.createElement('h3');
names.id = 'userName';
const username = document.createTextNode(usersComment[i].user_name)

const pragraph = document.createElement('p');
pragraph.id = "pragraph";
const pcont = document.createTextNode(usersComment[i].userComment);

const replay = document.createElement('button');
replay.id = 'replay';
replay.innerHTML = "Replay";
const deleteMessage = document.createElement('button');
deleteMessage.id = "delete";
deleteMessage.innerHTML = "Delete";

names.appendChild(username);
pragraph.appendChild(pcont);
recevedMessage.appendChild(names);
recevedMessage.appendChild(pragraph);
recevedMessage.appendChild(replay);
recevedMessage.appendChild(deleteMessage);
mangemessage.appendChild(recevedMessage);
}
///deleting comment
const removeComent = document.querySelectorAll('#delete');
for(let i = 0;i<removeComent.length;i++){
    for(let j = 0;j<usersComment.length;j++){
        removeComent[i].addEventListener('click',() => {
            if(i === j){
                const commentIndex = usersComment.indexOf(usersComment[i]);
            if(commentIndex > -1){
                prompt('Are you sure do delet this querry ?')
                usersComment.splice(commentIndex,1);
               let  newQuerries = JSON.stringify(usersComment);
                localStorage.setItem('comments',newQuerries);
            }
            }
        })
    }
}

