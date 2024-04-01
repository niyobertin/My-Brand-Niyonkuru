const loggedIn = JSON.parse(localStorage.getItem('logedInUser'))
const token = loggedIn.token;
if(!token){
    console.log("LOGIN");
}else{
        const querriesUl = "https://mybrand-be-5zbq.onrender.com/api/v1/querries"
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
if(!token){
    console.log("LOGIN");
}else{
        const querriesUl = "https://mybrand-be-5zbq.onrender.com/api/v1/blogs"
        fetch(querriesUl,{
            method:'GET'
        })
        .then((res) => res.json())
        .then(data =>{
            const articals = data.blogs;
            let articalsNo = document.getElementById('total-artical');
            articalsNo.innerHTML = articals.length + ' ';
    })
    .catch(err =>{
        console.log(err.message)
    })
}

