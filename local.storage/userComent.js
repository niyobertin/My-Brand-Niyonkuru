
let usersComment = JSON.parse(localStorage.getItem('comments'));
if(usersComment === null){
    usersComment = [];
}

const mangemessage = document.querySelector('.usercomment');
for(let i = 0;i<usersComment.length;i++){
const recevedMessage = document.createElement("div");
recevedMessage.classList.add('newest-comment');
const names = document.createElement('h3');
names.id = 'userName';
const username = document.createTextNode(usersComment[i].user_name)

const pragraph = document.createElement('p');
pragraph.id = "pragraph";
const pcont = document.createTextNode(usersComment[i].userComment);

const replay = document.createElement('button');
replay.id = 'replay';
replay.innerHTML = "↩";
const deleteMessage = document.createElement('button');
deleteMessage.id = "delete";
deleteMessage.innerHTML = "🗑";

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
                usersComment.splice(commentIndex,1);
               let  newQuerries = JSON.stringify(usersComment);
                localStorage.setItem('comments',newQuerries);
                window.location.reload();
            }
            }
        })
    }
}

