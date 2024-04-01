
const loader = document.querySelector("#loading");
 const displayLoading = () =>{
   loader.classList.add("display");
   setTimeout(() =>{
      loader.classList.remove("display")
   },1000 * 60 * 60);
}
const hideLoading = () =>{
   loader.classList.remove("display")
}

const querryDiv = document.querySelector('.contents');
const loggedIn = JSON.parse(localStorage.getItem('logedInUser'))
const token = loggedIn.token;
if(!token){
    console.log("LOGIN");
}else{
        const querriesUl = "https://mybrand-be-5zbq.onrender.com/api/v1/querries"
        displayLoading()
        fetch(querriesUl,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then(data =>{
            hideLoading()
            const querries = data.querries;
            for(let i = 0;i < querries.length;i++){
                const newQuerry = document.createElement("div");
                newQuerry.classList.add('newest-query');
                const name = document.createElement('h2');
                const names = document.createTextNode(querries[i].visitor);
                const message = document.createElement('p');
                const messages = document.createTextNode(querries[i].message);
                const delete_button = document.createElement('button');
                delete_button.classList.add ='delete';
                delete_button.id ='delete';
                delete_button.classList.add = "replay";
                delete_button.innerHTML = 'Delete';

                name.appendChild(names);
                message.appendChild(messages);
                newQuerry.appendChild(name);
                newQuerry.appendChild(message);
                newQuerry.appendChild(delete_button)
                querryDiv.appendChild(newQuerry);
                delete_button.addEventListener("click",() =>{
                    const querryId = querries[i]._id;
                    deletequerry(querryId,token);
                })
            }
    })
    .catch(err =>{
        console.log(err.message)
    })
}
const popMessage = document.querySelector(".pop-up");
const deletequerry = (id,token) =>{
    const url = `https://mybrand-be-5zbq.onrender.com/api/v1/querries/${id}`;
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            popMessage.innerHTML = 'Network response was not ok';
            popMessage.style.display = "block";
            setTimeout(() => {
                popMessage.style.display = "none";
              }, 2000);
        }
        return response.json();
    })
    .then(() => {
        popMessage.innerHTML = "Querry deleted Successful!";
        popMessage.style.display = "block";
        setTimeout(() => {
            popMessage.style.display = "none";
            window.location.reload();
          }, 2000);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
}



