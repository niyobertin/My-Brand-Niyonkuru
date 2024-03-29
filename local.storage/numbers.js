
let querriesFromLocalStorage = JSON.parse(window.localStorage.getItem("querries"));
if(querriesFromLocalStorage === null){
    querriesFromLocalStorage = []; 
}
let dataFromLocalStorage = JSON.parse(window.localStorage.getItem("blogs"));
if(dataFromLocalStorage === null){
    dataFromLocalStorage = [];
}
const token = localStorage.getItem('token');
if(!token){
    console.log("LOGIN");
}else{
        const querriesUl = "https://mybrand-be-nkyz.onrender.com/api/v1/querries"
        fetch(querriesUl,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then(data =>{
            const querries = data.querries;
            let querriesNo = document.getElementById('total-querry');
            querriesNo.innerHTML = querries.length + ' ';
    })
    .catch(err =>{
        console.log(err.message)
    })
}

let articals = document.getElementById('total-artical');
articals.innerHTML = dataFromLocalStorage.length + ' ';

 let usersComment = JSON.parse(localStorage.getItem('comments'));
if(usersComment === null){
    usersComment = [];
}
 let messages = document.getElementById("total-comments");
 messages.innerHTML = usersComment.length + " ";
